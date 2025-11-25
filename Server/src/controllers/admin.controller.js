import db from "../config/db.js";

const kyc = async (req, res) => {
  const query = `
                    SELECT * from kyc where kyc_status='pending'
                `;
  const { rows } = await db.query(query);
  const profile = rows;
  return res.status(201).json({
    success: true,
    message: "KYC details fetched successfully",
    data: rows,
  });
};

const loanApplication = async (req, res) => {
  const query = `
                    SELECT * from loan_application where status='pending'
                `;
  const { rows } = await db.query(query);
  const profile = rows;
  return res.status(201).json({
    success: true,
    message: "Loan application details fetched successfully",
    data: rows,
  });
};

const dashboard = async (req, res) => {
  try {
    const totalBorrowersQuery = `SELECT COUNT(*) AS total_borrowers FROM borrower`;
    const totalLendersQuery = `SELECT COUNT(*) AS total_lenders FROM lender`;
    const activeLoansQuery = `SELECT COUNT(*) AS active_loans FROM funded_loans`;
    const pendingKycQuery = `SELECT COUNT(*) AS pending_kyc FROM kyc WHERE kyc_status = 'pending'`;
    const blockedBorrowersQuery = `SELECT COUNT(*) AS blocked_borrowers FROM borrower WHERE blocked = TRUE`;
    const blockedLendersQuery = `SELECT COUNT(*) AS blocked_lenders FROM lender WHERE blocked = TRUE`;

    // Run all queries in parallel for speed
    const [
      totalBorrowersResult,
      totalLendersResult,
      activeLoansResult,
      pendingKycResult,
      blockedBorrowersResult,
      blockedLendersResult
    ] = await Promise.all([
      db.query(totalBorrowersQuery),
      db.query(totalLendersQuery),
      db.query(activeLoansQuery),
      db.query(pendingKycQuery),
      db.query(blockedBorrowersQuery),
      db.query(blockedLendersQuery)
    ]);

    const totalBorrowers = parseInt(totalBorrowersResult.rows[0].total_borrowers);
    const totalLenders = parseInt(totalLendersResult.rows[0].total_lenders);
    const activeLoans = parseInt(activeLoansResult.rows[0].active_loans);
    const pendingKyc = parseInt(pendingKycResult.rows[0].pending_kyc);
    const blockedUsers =
      parseInt(blockedBorrowersResult.rows[0].blocked_borrowers) +
      parseInt(blockedLendersResult.rows[0].blocked_lenders);

    const totalUsers = totalBorrowers + totalLenders;

    res.status(200).json({
      success: true,
      message: "Admin dashboard data fetched successfully",
      data: {
        totalUsers,
        totalBorrowers,
        totalLenders,
        activeLoans,
        pendingKyc,
        blockedUsers
      }
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching dashboard data",
      error: error.message
    });
  }
};

const getAllBorrowers = async (req, res) => {
  const query = `SELECT * FROM borrower`;
  const { rows } = await db.query(query);

  return res.status(200).json({ 
    success: true,
    message: "All borrowers fetched successfully",
    data: rows 
  });
};

const getAllLenders = async (req, res) => {
  const query = `SELECT * FROM lender`;
  const { rows } = await db.query(query); 
  return res.status(200).json({
    success: true,
    message: "All lenders fetched successfully",
    data: rows 
  });
};

const checkAadhaar = async (req, res) => {
  const { aadhaarNumber } = req.params;
  const query = `SELECT * FROM kyc WHERE aadhaar_no = $1`;
  const { rows } = await db.query(query, [aadhaarNumber]);
  const exists = rows.length > 0;
  return res.status(200).json({ exists });
};

const getLoanById = async (req, res) => {
  const { id } = req.params;
  const query = `SELECT * FROM loan_application WHERE application_id = $1`;
  const { rows } = await db.query(query, [id]);
  console.log(rows);
  if (!rows.length)
    return res.status(404).json({ success: false, message: "Loan not found" });

  res.status(200).json({ success: true, data: rows[0] });
};

const approveLoan = async (req, res) => {
  console.log("Approve loan called");
  console.log(req.params);
  try {
    const { id } = req.params;
    const query = `
      UPDATE loan_application 
      SET status = 'approved'
      WHERE application_id = $1
      RETURNING *;
    `;

    const { rows } = await db.query(query, [id]);

    if (!rows.length) {
      return res.status(404).json({
        success: false,
        message: "Loan application not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Loan application approved successfully",
      data: rows[0]
    });
  } catch (error) {
    console.error("Error approving loan:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};

const rejectLoan = async (req, res) => {
  try {
    const { id } = req.params;
    const query = `
      UPDATE loan_application 
      SET status = 'rejected'
      WHERE application_id = $1
      RETURNING *;
    `;

    const { rows } = await db.query(query, [id]);

    if (!rows.length) {
      return res.status(404).json({
        success: false,
        message: "Loan application not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Loan application rejected successfully",
      data: rows[0]
    });
  } catch (error) {
    console.error("Error rejecting loan:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};

const approveKyc = async (req, res) => {
  const { kyc_id } = req.params;

  try {
    const query = `
      UPDATE kyc
      SET kyc_status = 'approved'
      WHERE kyc_id = $1
      RETURNING *;
    `;

    const result = await db.query(query, [kyc_id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "KYC not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Loan application approved successfully",
      data: rows[0]
    });
  } catch (err) {
    console.error("Approve KYC Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const rejectKyc = async (req, res) => {
  const { kyc_id } = req.params;

  try {
    const query = `
      UPDATE kyc
      SET kyc_status = 'rejected'
      WHERE kyc_id = $1
      RETURNING *;
    `;

    const result = await db.query(query, [kyc_id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "KYC not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Loan application rejected successfully",
      data: rows[0]
    });
  } catch (err) {
    console.error("Reject KYC Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export { dashboard, kyc, loanApplication, getAllBorrowers, getAllLenders, checkAadhaar, getLoanById, approveLoan, rejectLoan, approveKyc, rejectKyc };
