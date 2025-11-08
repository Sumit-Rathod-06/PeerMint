import db from "../config/db.js";

// Fetch all approved/pending loan applications
export const getLoanApplications = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT 
        application_id,
        full_name,
        purpose_of_loan,
        loan_amount,
        loan_tenure,
        status,
        email,
        city,
        state,
        created_at
      FROM loan_application
      WHERE status IN ( 'approved')
      ORDER BY created_at DESC
    `);

    res.status(200).json({
      success: true,
      applications: result.rows,
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


export const fundLoan = async (req, res) => {
  const { applicationId, fundedAmount, interestRate, loanTenure } = req.body;
    const lenderId = req.user.id;
    console.log("Lender ID funding the loan:", lenderId);
    console.log("Funding loan application ID:", applicationId);
    console.log("Funded Amount:", fundedAmount);
    console.log("Interest Rate:", interestRate);
    console.log("Loan Tenure (months):", loanTenure);

  if (!lenderId || !applicationId || !fundedAmount) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }

  const client = await db.connect();
  try {
    await client.query("BEGIN");

    // 1️⃣ Get borrower_id from loan_application
    const { rows } = await client.query(
      "SELECT borrower_id FROM loan_application WHERE application_id = $1",
      [applicationId]
    );
    if (rows.length === 0) {
      throw new Error("Loan application not found");
    }
    const borrowerId = rows[0].borrower_id;

    // 2️⃣ Insert into funded_loans
    await client.query(
        `INSERT INTO funded_loans 
        (borrower_id, lender_id, funded_amount, interest_rate, loan_tenure, start_date, end_date)
        VALUES ($1, $2, $3, $4, $5, CURRENT_DATE, CURRENT_DATE + make_interval(months => $5))`,
        [borrowerId, lenderId, fundedAmount, interestRate, loanTenure]
    );


    // 3️⃣ Delete from loan_application (loan moved)
    await client.query("DELETE FROM loan_application WHERE application_id = $1", [applicationId]);

    // 4️⃣ Decrease lender's available_funds
    await client.query(
      `UPDATE lender 
       SET available_balance = available_balance - $1 
       WHERE lender_id = $2`,
      [fundedAmount, lenderId]
    );
    await client.query("COMMIT");
    res.status(200).json({ success: true, message: "Loan funded successfully" });
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Error funding loan:", err.message);
    res.status(500).json({ success: false, message: err.message });
  } finally {
    client.release();
  }
};
