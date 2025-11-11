import db from "../config/db.js";

// Fetch all approved loan applications
export const getLoanApplications = async (req, res) => {
  const lenderId = req.user.id;
  try {
    const loanApplicationQuery = `
      SELECT *
      FROM loan_application
      WHERE status IN ( 'approved')
      ORDER BY created_at DESC
    `;
    const summaryQuery = `
      SELECT 
        COALESCE(SUM(f.funded_amount), 0)::float AS total_invested,
        COUNT(*) FILTER (WHERE f.repayment_status ILIKE 'active') AS active,
        COUNT(*) FILTER (WHERE f.repayment_status ILIKE 'Completed') AS completed,
        COUNT(*) FILTER (WHERE f.repayment_status ILIKE 'Defaulted') AS defaulted,
        COALESCE(SUM(la.total_amount - la.loan_amount), 0)::float AS total_interest_earned
      FROM funded_loans f
      JOIN loan_application la ON f.funded_loan_id = la.application_id
      WHERE f.lender_id = $1;
    `;
    const [applicationsResult, summaryResult] = await Promise.all([
      db.query(loanApplicationQuery),
      db.query(summaryQuery, [lenderId]),
    ]);

    res.status(200).json({
      success: true,
      applications: applicationsResult.rows,
      summary: summaryResult.rows[0],
    });
  } catch (error) {
    console.error("Error fetching loan applications:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch loan applications",
      error: error.message,
    });
  }
};


// export const fundLoan = async (req, res) => {
//   const { applicationId, fundedAmount, interestRate, loanTenure } = req.body;
//     const lenderId = req.user.id;
//     console.log("Lender ID funding the loan:", lenderId);
//     console.log("Funding loan application ID:", applicationId);
//     console.log("Funded Amount:", fundedAmount);
//     console.log("Interest Rate:", interestRate);
//     console.log("Loan Tenure (months):", loanTenure);

//   if (!lenderId || !applicationId || !fundedAmount) {
//     return res.status(400).json({ success: false, message: "Missing required fields" });
//   }

//   const client = await db.connect();
//   try {
//     await client.query("BEGIN");

//     // 1️⃣ Get borrower_id from loan_application
//     const { rows } = await client.query(
//       "SELECT borrower_id FROM loan_application WHERE application_id = $1",
//       [applicationId]
//     );
//     if (rows.length === 0) {
//       throw new Error("Loan application not found");
//     }
//     const borrowerId = rows[0].borrower_id;

//     // 2️⃣ Insert into funded_loans
//     await client.query(
//         `INSERT INTO funded_loans 
//         (borrower_id, lender_id, funded_amount, interest_rate, loan_tenure, start_date, end_date)
//         VALUES ($1, $2, $3, $4, $5, CURRENT_DATE, CURRENT_DATE + make_interval(months => $5))`,
//         [borrowerId, lenderId, fundedAmount, interestRate, loanTenure]
//     );


//     // 3️⃣ Update the status from loan_application (loan moved)
//     await client.query(
//       `UPDATE loan_application 
//       SET status = 'funded' 
//       WHERE application_id = $1`,
//       [applicationId]
//     );
//     //await client.query("DELETE FROM loan_application WHERE application_id = $1", [applicationId]);

//     // 4️⃣ Decrease lender's available_funds
//     await client.query(
//       `UPDATE lender 
//        SET available_balance = available_balance - $1 
//        WHERE lender_id = $2`,
//       [fundedAmount, lenderId]
//     );
//     await client.query("COMMIT");
//     res.status(200).json({ success: true, message: "Loan funded successfully" });
//   } catch (err) {
//     await client.query("ROLLBACK");
//     console.error("Error funding loan:", err.message);
//     res.status(500).json({ success: false, message: err.message });
//   } finally {
//     client.release();
//   }
// };

export const fundLoan = async (req, res) => {
  const { applicationId, fundedAmount, interestRate, loanTenure, emi, payableAmount } = req.body;
  console.log("fundLoan called with:", { applicationId, fundedAmount, interestRate, loanTenure, emi });
  const lenderId = req.user.id;
  console.log("Lender ID funding the loan:", lenderId);

  if (!lenderId || !applicationId || !fundedAmount || !interestRate || !loanTenure) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }

  const client = await db.connect();

  try {
    await client.query("BEGIN");

    // 1️⃣ Get borrower_id and risk info from loan_application
    const loanAppRes = await client.query(
      `SELECT borrower_id, risk_level, loan_amount 
       FROM loan_application 
       WHERE application_id = $1`,
      [applicationId]
    );
    if (loanAppRes.rows.length === 0) {
      throw new Error("Loan application not found");
    }
    const { borrower_id: borrowerId, risk_level: riskLevel } = loanAppRes.rows[0];
    console.log("Borrower ID:", borrowerId, "Risk Level:", riskLevel);
    // 2️⃣ Insert into funded_loans
    const fundedRes = await client.query(
      `INSERT INTO funded_loans 
        (funded_loan_id, borrower_id, lender_id, funded_amount, interest_rate, loan_tenure, start_date, end_date, repayment_status)
       VALUES ($1, $2, $3, $4, $5, $6, CURRENT_DATE, CURRENT_DATE + make_interval(months => $6), 'active')
       RETURNING funded_loan_id`,
      [applicationId, borrowerId, lenderId, fundedAmount, interestRate, loanTenure]
    );
    const fundedId = fundedRes.rows[0].funded_loan_id;
    console.log("Funded Loan ID:", fundedId);

    // 3️⃣ Update loan_application → status = 'funded'
    await client.query(
      `UPDATE loan_application SET status = 'funded' WHERE application_id = $1`,
      [applicationId]
    );

    // 4️⃣ Deduct lender’s available balance
    await client.query(
      `UPDATE lender 
       SET available_balance = available_balance - $1,
           total_invested = COALESCE(total_invested, 0) + $1
       WHERE lender_id = $2`,
      [fundedAmount, lenderId]
    );

    // 5️⃣ Log transaction in transaction_history
    await client.query(
      `INSERT INTO transaction_history
        (lender_id, transaction_type, amount, status, funded_loan_id , remarks)
       VALUES ($1, 'Investment', $2, 'Success', $3, 'Loan funded successfully')`,
      [lenderId, fundedAmount, fundedId]
    );

    // 6️⃣ Generate repayment schedule (Simple interest)

    const monthlyRate = interestRate / 12 / 100;
    let remainingPrincipal = fundedAmount;

    for (let i = 1; i <= loanTenure; i++) {
      const interestComponent = remainingPrincipal * monthlyRate;
      const principalComponent = emi - interestComponent;

      // update remaining balance
      remainingPrincipal -= principalComponent;

      await client.query(
        `INSERT INTO repayment_schedule 
        (funded_loan_id, borrower_id, lender_id, installment_number, due_date, 
          principal_component, interest_component, total_payment, payment_status)
        VALUES ($1, $2, $3, $4, CURRENT_DATE + make_interval(months => $5),
                $6, $7, $8, 'Pending')`,
        [
          fundedId,
          borrowerId,
          lenderId,
          i,
          i, // months ahead
          principalComponent.toFixed(2),
          interestComponent.toFixed(2),
          emi.toFixed(2),
        ]
      );
    }
    // 7️⃣ Update portfolio metrics (optional table)
    await client.query(
      `INSERT INTO portfolio_metrics (lender_id, total_invested, total_interest_earned, active_loans)
       VALUES ($1, $2, $3, 1)
       ON CONFLICT (lender_id)
       DO UPDATE SET 
         total_invested = portfolio_metrics.total_invested + EXCLUDED.total_invested,
         total_interest_earned = portfolio_metrics.total_interest_earned + EXCLUDED.total_interest_earned,
         active_loans = portfolio_metrics.active_loans + 1`,
      [lenderId, fundedAmount, (payableAmount - fundedAmount)]
    );

    await client.query("COMMIT");

    res.status(200).json({
      success: true,
      message: "Loan funded successfully",
      fundedLoanId: fundedId,
    });
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("❌ Error funding loan:", err.message);
    res.status(500).json({ success: false, message: err.message });
  } finally {
    client.release();
  }
};

export const getLenderSummary = async (req, res) => {
  const lenderId = req.user.id;
  console.log("Fetching summary for lender ID:", lenderId);
  try {
    const query = `
      SELECT 
        f.funded_loan_id AS id,
        CONCAT(b.first_name, ' ', b.last_name) AS borrower,
        f.funded_amount AS amount,
        f.interest_rate AS roi,
        f.loan_tenure AS tenure,
        f.repayment_status AS status
      FROM funded_loans f
      JOIN borrower b ON f.borrower_id = b.borrower_id
      WHERE f.lender_id = $1
      ORDER BY f.funded_loan_id;
    `;

    const result = await db.query(query, [lenderId]);
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching loans:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getLenderDashboard = async (req, res) => {
  const lenderId = req.user.id;

  try {
    const investmentsQuery = `
      SELECT 
        f.funded_loan_id AS id,
        CONCAT(b.first_name, ' ', b.last_name) AS borrower,
        f.funded_amount::float AS amount,
        f.interest_rate::float AS roi,
        f.loan_tenure AS tenure,
        f.repayment_status AS status
      FROM funded_loans f
      JOIN borrower b ON f.borrower_id = b.borrower_id
      WHERE f.lender_id = $1
      ORDER BY f.funded_loan_id;
    `;

    const summaryQuery = `
      SELECT 
        COALESCE(SUM(f.funded_amount), 0)::float AS total_invested,
        COUNT(*) FILTER (WHERE f.repayment_status ILIKE 'active') AS active,
        COUNT(*) FILTER (WHERE f.repayment_status ILIKE 'Completed') AS completed,
        COUNT(*) FILTER (WHERE f.repayment_status ILIKE 'Defaulted') AS defaulted,
        COALESCE(SUM(la.total_amount - la.loan_amount), 0)::float AS total_interest_earned
      FROM funded_loans f
      JOIN loan_application la ON f.funded_loan_id = la.application_id
      WHERE f.lender_id = $1;
    `;

    const barQuery = `
      SELECT 
        CONCAT(b.first_name, ' ', b.last_name) AS name,
        ROUND(AVG(f.interest_rate)::numeric, 2)::float AS ROI,
        SUM(f.funded_amount)::float AS Amount
      FROM funded_loans f
      JOIN borrower b ON f.borrower_id = b.borrower_id
      WHERE f.lender_id = $1
      GROUP BY b.first_name, b.last_name;
    `;

    const pieQuery = `
      SELECT 
        repayment_status AS name,
        COUNT(*) AS value
      FROM funded_loans
      WHERE lender_id = $1
      GROUP BY repayment_status;
    `;

    const [investments, summary, bar, pie] = await Promise.all([
      db.query(investmentsQuery, [lenderId]),
      db.query(summaryQuery, [lenderId]),
      db.query(barQuery, [lenderId]),
      db.query(pieQuery, [lenderId]),
    ]);

    res.status(200).json({
      investments: investments.rows,
      summary: summary.rows[0],
      charts: {
        bar: bar.rows,
        pie: pie.rows,
      },
    });
  } catch (error) {
    console.error("Error fetching lender dashboard:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const getLenderTransactions = async (req, res) => {
  const lenderId = req.user.id;

  try {
    const query = `
      SELECT 
        transaction_id AS id,
        transaction_type AS type,
        amount::float,
        transaction_date,
        status,
        remarks
      FROM transaction_history
      WHERE lender_id = $1
      ORDER BY transaction_date DESC;
    `;
    const result = await db.query(query, [lenderId]);
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching transactions:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getLenderPortfolio = async (req, res) => {
  const lenderId = req.user.id;

  try {
    const query = `
      SELECT 
        total_invested::float,
        total_interest_earned::float,
        active_loans,
        default_risk_percent::float,
        portfolio_health
      FROM portfolio_metrics
      WHERE lender_id = $1;
    `;
    const result = await db.query(query, [lenderId]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error fetching portfolio metrics:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
