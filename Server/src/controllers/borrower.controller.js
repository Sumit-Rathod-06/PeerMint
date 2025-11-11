import db from "../config/db.js";
import { upload } from "../utils/cloudinary.js";

const kyc = async (req, res) => {
  console.log(req.files)
  const borrowerId = req.user.id;
  const kyc_status = "pending";

  const {
    fullName,
    dateOfBirth,
    gender,
    panNumber,
    aadhaarNumber,
    fatherName,
    maritalStatus,
    addressLine1,
    addressLine2,
    pincode,
    city,
    state,
    residentialStatus,
  } = req.body;

  const address = `${addressLine1}, ${addressLine2}`;

  try {
    const existingProfile = await db.query(
      "SELECT kyc_id FROM kyc WHERE kyc_id = $1",
      [borrowerId]
    );

    if (existingProfile.rows.length > 0) {
      return res.status(200).json({
        success: true,
        message: "KYC form already submitted!",
        data: existingProfile.rows[0],
      });
    }

    // Get file URLs from multer-storage-cloudinary
    const photoUrl = req.files.photo?.[0]?.path || null;
    const panUrl = req.files.pan?.[0]?.path || null;
    const aadhaarUrl = req.files.aadhaar?.[0]?.path || null;

    const query = `
      INSERT INTO kyc 
      (kyc_id, full_name, dob, gender, pan_no, aadhaar_no, father_name, marital_status, address, pincode, city, state, residential_status, photo_url, aadhaar_url, pan_url, kyc_status)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17)
      RETURNING *;
    `;

    const values = [
      borrowerId,
      fullName,
      dateOfBirth,
      gender,
      panNumber,
      aadhaarNumber,
      fatherName,
      maritalStatus,
      address,
      pincode,
      city,
      state,
      residentialStatus,
      photoUrl,
      aadhaarUrl,
      panUrl,
      kyc_status,
    ];

    const { rows } = await db.query(query, values);

    res.status(201).json({
      success: true,
      message: "KYC submitted successfully",
      data: rows[0],
    });
  } catch (error) {
    console.error("KYC Submission Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// const loanApplication = async (req, res) => {
//   console.log("Loan Application Request Body:", req.body);
//   const borrowerId = req.user.id;
//   const status = "pending";

//   const {
//     fullName,
//     email,
//     mobile,
//     dateOfBirth,
//     gender,
//     panNumber,
//     aadhaarNumber,
//     addressLine1,
//     addressLine2,
//     pincode,
//     city,
//     state,
//     residentialStatus,
//     yearsAtAddress,
//     employmentType,
//     bankName,
//     accountNumber,
//     ifscCode,
//     loanAmount,
//     loanPurpose,
//     tenure,
//   } = req.body;

//   const address = `${addressLine1}, ${addressLine2}`;
//   const normalize = (v) => (v === "" ? null : v);

//   try {
//     const existingProfile = await db.query(
//       "SELECT borrower_id, kyc_status FROM borrower WHERE borrower_id = $1",
//       [borrowerId]
//     );

//     if (existingProfile.rows.length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: "Borrower does not exist!",
//       });
//     }

//     if (
//       existingProfile.rows[0].kyc_status === "pending" ||
//       existingProfile.rows[0].kyc_status === "rejected"
//     ) {
//       return res.status(400).json({
//         success: false,
//         message: "KYC pending!",
//       });
//     }

//     const query = `
//       INSERT INTO loan_application (
//         borrower_id, full_name, email, mobile_no, dob, gender, pan_no, aadhaar_no,
//         address_line1, pincode, city, state, residential_status, years_at_current_address,
//         employment_type, bank_name, bank_account_no, ifsc_code, loan_amount,
//         purpose_of_loan, loan_tenure, status
//       )
//       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22)
//       RETURNING *;
//     `;

//     const values = [
//       borrowerId,
//       fullName,
//       email,
//       mobile,
//       dateOfBirth,
//       gender,
//       panNumber,
//       aadhaarNumber,
//       address,
//       normalize(pincode),
//       city,
//       state,
//       residentialStatus,
//       normalize(yearsAtAddress),
//       employmentType,
//       bankName,
//       normalize(accountNumber),
//       ifscCode,
//       normalize(loanAmount),
//       loanPurpose,
//       normalize(tenure),
//       status,
//     ];

//     const { rows } = await db.query(query, values);

//     return res.status(201).json({
//       success: true,
//       message: "Loan application submitted successfully",
//       data: rows[0],
//     });
//   } catch (error) {
//     console.error("Loan Application Error:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };
const loanApplication = async (req, res) => {
  console.log("Loan Application Request Body:", req.body);
  const borrowerId = req.user.id;
  const status = "pending";

  const {
    // Personal Details
    fullName,
    email,
    mobile,
    dateOfBirth,
    gender,

    // Identification
    panNumber,
    aadhaarNumber,

    // Address
    addressLine1,
    addressLine2,
    city,
    state,
    pincode,
    residentialStatus,
    yearsAtAddress,

    // Employment / Business
    employmentType,
    annualIncome,
    businessName,

    // Bank
    bankName,
    accountNumber,
    ifscCode,

    // Loan Details
    loanAmount,
    loanPurpose,
    tenure,
    interestRate,
    estimatedEMI,
    totalAmount,

    // Optional Documents
    itrUrl,
    bankStatementUrl
  } = req.body;

  const address = `${addressLine1 || ""}, ${addressLine2 || ""}`;
  const normalize = (v) => (v === "" ? null : v);
  try {
    // Verify borrower existence and KYC status
    const existingProfile = await db.query(
      "SELECT borrower_id, kyc_status FROM borrower WHERE borrower_id = $1",
      [borrowerId]
    );

    if (existingProfile.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Borrower does not exist!"
      });
    }

    const kycStatus = existingProfile.rows[0].kyc_status;
    if (kycStatus === "pending" || kycStatus === "rejected") {
      return res.status(400).json({
        success: false,
        message: "KYC pending or rejected. Please complete KYC first."
      });
    }

    // Insert into loan_application table
    const query = `
      INSERT INTO loan_application (
        borrower_id,
        full_name, email, mobile_no, dob, gender,
        pan_no, aadhaar_no,
        address_line1, address_line2, city, state, pincode,
        residential_status, years_at_current_address,
        employment_type, annual_income, business_name,
        bank_name, bank_account_no, ifsc_code,
        loan_amount, purpose_of_loan, loan_tenure,
        interest_rate, estimated_emi, total_amount,
        itr_url, bank_statement_url,
        status
      )
      VALUES (
        $1, $2, $3, $4, $5, $6,
        $7, $8,
        $9, $10, $11, $12, $13,
        $14, $15,
        $16, $17, $18,
        $19, $20, $21,
        $22, $23, $24,
        $25, $26, $27,
        $28, $29,
        $30
      )
      RETURNING *;
    `;

    const values = [
      borrowerId,
      fullName, email, mobile, dateOfBirth, gender,
      panNumber, aadhaarNumber,
      addressLine1, addressLine2, city, state, pincode,
      residentialStatus, yearsAtAddress,
      employmentType, normalize(annualIncome), businessName,
      bankName, accountNumber, ifscCode,
      loanAmount, loanPurpose, tenure,
      interestRate, estimatedEMI, totalAmount,
      itrUrl, bankStatementUrl,
      status
    ];

    const { rows } = await db.query(query, values);

    return res.status(201).json({
      success: true,
      message: "Loan application submitted successfully",
      data: rows[0]
    });

  } catch (error) {
    console.error("Loan Application Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while submitting loan application"
    });
  }
};


const getBorrowerProfile = async (req, res) => {
  const borrowerId = req.user.id;
  const { rows } = await db.query(
    "SELECT * FROM borrower WHERE borrower_id = $1",
    [borrowerId]
  );
  if (rows.length > 0) {
    res.status(200).json({ success: true, data: rows[0] });
  } else {
    res.status(404).json({ success: false, message: "Profile not found" });
  }
};

const uploadKycDocuments = async (req, res) => {
  try {
    const { application_id } = req.body;

    const photoUrl = req.files.photo?.[0]?.path;
    const panUrl = req.files.identityDoc?.[0]?.path;
    const aadharUrl = req.files.addressProof?.[0]?.path;

    await pool.query(
      `UPDATE loan_application SET 
        photo_url = $1,
        pan_url = $2,
        aadhar_url = $3,
        status = 'submitted'
       WHERE id = $4`,
      [photoUrl, panUrl, aadharUrl, application_id]
    );

    res.json({ success: true, message: "Documents uploaded successfully" });
  } catch (error) {
    console.error("KYC Upload Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


const dashboard = async (req, res) => {
  const borrowerId = req.user.id;

  try {
    // 1️⃣ Total Loan Amount
    const totalLoanRes = await db.query(
      `SELECT COALESCE(SUM(funded_amount), 0) AS total_loan
       FROM funded_loans WHERE borrower_id = $1`,
      [borrowerId]
    );

    // 2️⃣ Active Loans count
    const activeLoansRes = await db.query(
      `SELECT COUNT(*) AS active_loans 
       FROM funded_loans WHERE borrower_id = $1 AND repayment_status = 'active'`,
      [borrowerId]
    );

    // 3️⃣ Pending EMIs count
    const pendingEmiRes = await db.query(
      `SELECT COUNT(*) AS pending_emis 
       FROM repayment_schedule 
       WHERE borrower_id = $1 AND payment_status = 'Pending'`,
      [borrowerId]
    );

    // 4️⃣ Total Repaid amount
    const repaidRes = await db.query(
      `SELECT COALESCE(SUM(total_payment), 0) AS total_repaid
       FROM repayment_schedule 
       WHERE borrower_id = $1 AND payment_status = 'Paid'`,
      [borrowerId]
    );

    // 5️⃣ KYC Status
    const kycRes = await db.query(
      `SELECT kyc_status FROM borrower WHERE borrower_id = $1`,
      [borrowerId]
    );

    // 6️⃣ Upcoming Payments (next 3)
    const upcomingRes = await db.query(
      `SELECT due_date, total_payment AS amount, payment_status 
       FROM repayment_schedule 
       WHERE borrower_id = $1 
       ORDER BY due_date ASC 
       LIMIT 3`,
      [borrowerId]
    );

    // 7️⃣ Notifications
    const notificationsRes = await db.query(
      `SELECT 
          'Your EMI for Loan #' || f.funded_loan_id || ' is due on ' || TO_CHAR(r.due_date, 'DD Mon YYYY') AS message
       FROM repayment_schedule r
       JOIN funded_loans f ON r.funded_loan_id = f.funded_loan_id
       WHERE r.borrower_id = $1 
         AND r.payment_status = 'Pending'
       ORDER BY r.due_date, r.funded_loan_id ASC 
       LIMIT 2`,
      [borrowerId]
    );

    const recentAppRes = await db.query(
      `SELECT 'Your loan application #' || application_id || ' was ' || status || '.' AS message
       FROM loan_application 
       WHERE borrower_id = $1 
       ORDER BY created_at DESC 
       LIMIT 1`,
      [borrowerId]
    );

    // Add fallback messages
    const notifications = [
      ...(notificationsRes.rows.length ? notificationsRes.rows : []),
      ...(recentAppRes.rows.length ? recentAppRes.rows : []),
      { message: kycRes.rows[0]?.kyc_status === "approved" ? "KYC Verified" : "KYC verification pending." },
    ];

    // ✅ Final dashboard response
    res.json({
      success: true,
      data: {
        totalLoanAmount: totalLoanRes.rows[0].total_loan,
        activeLoans: activeLoansRes.rows[0].active_loans,
        pendingEmis: pendingEmiRes.rows[0].pending_emis,
        totalRepaid: repaidRes.rows[0].total_repaid,
        kycStatus: kycRes.rows[0]?.kyc_status || "pending",
        upcomingPayments: upcomingRes.rows,
        notifications,
      },
    });
  } catch (err) {
    console.error("❌ Error fetching borrower dashboard:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getBorrowerLoans  = async (req, res) => {
  const borrowerId = req.user.id;
  try {
    const query = `
      SELECT 
        a.application_id AS loan_id,
        a.loan_amount AS amount,
        a.interest_rate,
        a.loan_tenure AS tenure,
        a.estimated_emi,
        CASE 
          WHEN f.created_at IS NOT NULL THEN f.created_at
          ELSE a.created_at
        END AS start_date,
        CASE 
          WHEN f.created_at IS NOT NULL THEN (f.created_at + (a.loan_tenure || ' months')::interval)
          ELSE NULL
        END AS end_date,
        CASE 
          WHEN f.repayment_status IS NOT NULL THEN f.repayment_status
          ELSE a.status
        END AS status,
        COALESCE(l.first_name || ' ' || l.last_name, 'not funded yet') AS lender_name
      FROM loan_application a
      LEFT JOIN funded_loans f ON a.application_id = f.funded_loan_id
      LEFT JOIN lender l ON f.lender_id = l.lender_id
      WHERE a.borrower_id = $1
      ORDER BY a.application_id DESC;
    `;
    const result = await db.query(query, [borrowerId]);
    res.json({ success: true, data: result.rows });
  } catch (err) {
    console.error("Error fetching borrower loans:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getBorrowerLoan = async (req, res) => {
  const borrowerId = req.user.id;
  const { loanId } = req.params;
  console.log("Fetching details for loan ID:", loanId, "for borrower ID:", borrowerId);
  try {
    const query = `
      SELECT
        a.application_id AS loan_id,
        a.loan_amount AS amount,
        a.interest_rate,
        a.loan_tenure AS tenure,
        a.estimated_emi,
        a.purpose_of_loan AS purpose,
        a.total_amount AS repayment_ammount,
        CASE  
          WHEN f.created_at IS NOT NULL THEN f.created_at
          ELSE a.created_at 
        END AS start_date,
        CASE 
          WHEN f.created_at IS NOT NULL THEN (f.created_at + (a.loan_tenure || ' months')::interval)
          ELSE NULL
        END AS end_date,
        CASE
          WHEN f.repayment_status IS NOT NULL THEN f.repayment_status
          ELSE a.status 
        END AS status,
        COALESCE(l.first_name || ' ' || l.last_name, 'not funded yet') AS lender_name
      FROM loan_application a
      LEFT JOIN funded_loans f ON a.application_id = f.funded_loan_id
      LEFT JOIN lender l ON f.lender_id = l.lender_id
      WHERE a.borrower_id = $1 AND a.application_id = $2;
    `;
    const result = await db.query(query, [borrowerId, loanId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Loan not found" });
    }
    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    console.error("Error fetching borrower loan:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getRepayments = async(req, res) => {
  const borrowerId  = req.user.id;
  try {
    const query = `
      SELECT 
        rs.schedule_id,
        rs.funded_loan_id,
        rs.borrower_id,
        rs.lender_id,
        rs.installment_number,
        rs.due_date,
        rs.principal_component,
        rs.interest_component,
        rs.total_payment,
        rs.payment_status,
        rs.paid_on,
        la.application_id,
        la.loan_amount,
        la.interest_rate,
        la.loan_tenure,
        la.estimated_emi,
        la.full_name AS borrower_name
      FROM repayment_schedule rs
      JOIN loan_application la 
        ON rs.funded_loan_id = la.application_id
      WHERE rs.borrower_id = $1
      ORDER BY rs.due_date ASC;
    `;

    const { rows } = await db.query(query, [borrowerId]);

    res.json({ success: true, data: rows });
  } catch (error) {
    console.error("Error fetching repayment schedule:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const markInstallmentPaid = async (req, res) => {
  const { emi_id , loan_id, amount, payment_method, paid_on} = req.body;
  const schedule_id  = emi_id;

  try {
    // Fetch the record first
    const record = await db.query(
      `SELECT funded_loan_id, borrower_id, lender_id, total_payment FROM repayment_schedule WHERE schedule_id = $1`,
      [schedule_id]
    );

    if (record.rows.length === 0)
      return res.status(404).json({ message: "Schedule not found" });

    const { funded_loan_id, borrower_id, lender_id, total_payment } = record.rows[0];

    // Update status
    await db.query(
      `UPDATE repayment_schedule 
       SET payment_status = 'Paid', paid_on = $1 
       WHERE schedule_id = $2`,
      [paid_on, schedule_id]
    );

    // Add entry in transaction_history
    await db.query(
      `INSERT INTO transaction_history 
       (lender_id, funded_loan_id, transaction_type, amount, status, remarks)
       VALUES ($1, $2, 'Interest Received', $3, 'Success', 'EMI payment received from borrower_id ${borrower_id}')`,
      [lender_id, funded_loan_id, total_payment]
    );

    res.json({ success: true, message: "Installment marked as paid and transaction recorded." });
  } catch (error) {
    console.error("Error marking installment paid:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const validate = async (req, res) => {
  try {
    const borrowerId = req.user.id; // from token
    const result = await db.query(
      "SELECT borrower_id, first_name, last_name, email, kyc_status FROM borrower WHERE borrower_id = $1",
      [borrowerId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Borrower not found" });
    }
    // console.log("Borrower data fetched for ID:", borrowerId);
    // console.log(result.rows[0]);

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching borrower:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const getBorrowerProfileBasic = async (req, res) => {
  const borrowerId = req.user.id;
  const { rows } = await db.query(
    "SELECT borrower_id, first_name, last_name, phone_number, profile_photo_url, email, created_at FROM borrower WHERE borrower_id = $1",
    [borrowerId]
  );
  console.log("Fetched basic profile for borrower ID:", borrowerId);
  console.log(rows);
  if (rows.length > 0) {
    res.status(200).json({ success: true, data: rows[0] });
  } else {
    res.status(404).json({ success: false, message: "Profile not found" });
  }
};
const getBorrowerProfilePrivate = async (req, res) => {
  const borrowerId = req.user.id;
  const { rows } = await db.query(
    "SELECT kyc_id, full_name, dob, gender, pan_no, aadhaar_no, father_name, marital_status, address, pincode, city, state, residential_status, photo_url, aadhaar_url, pan_url, kyc_status FROM kyc WHERE kyc_id = $1",
    [borrowerId]
  );
  console.log("Fetched private profile for borrower ID:", borrowerId);
  console.log(rows);
  if (rows.length > 0) {
    res.status(200).json({ success: true, data: rows[0] });
  }
  else {
    res.status(404).json({ success: false, message: "Profile not found" });
  } 
};


export { dashboard, getBorrowerLoans, getBorrowerLoan, getRepayments, markInstallmentPaid, kyc, loanApplication, getBorrowerProfile, validate, getBorrowerProfileBasic, getBorrowerProfilePrivate, uploadKycDocuments };
