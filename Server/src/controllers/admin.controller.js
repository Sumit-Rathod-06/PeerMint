import db from "../config/db.js";

const kyc = async (req, res) => {
  const query = `
                    SELECT * from kyc where kyc_status='pending'
                `;
  const { rows } = await db.query(query);
  profile = rows[0];
  return res.status(201).json({
    success: true,
    message: "KYC details fetched successfully",
    data: profile,
  });
};

const loanApplication = async (req, res) => {
  const query = `
                    SELECT * from loan_application where status='pending'
                `;
  const { rows } = await db.query(query);
  profile = rows[0];
  return res.status(201).json({
    success: true,
    message: "Loan application details fetched successfully",
    data: profile,
  });
};

const dashboard = async (req, res) => {
  res.status(501).json({
    success: false,
    message: "Dashboard not implemented. Requires additional logic.",
  });
};

export { dashboard, kyc, loanApplication };
