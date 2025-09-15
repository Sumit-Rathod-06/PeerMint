import db from "../config/db.js";

const kyc = async (req, res) => {
  const borrowerId = req.user.id;
  console.log("Borrower ID from token:", borrowerId);
  const kyc_status = 'pending';
  const { fullName, dateOfBirth, gender, panNumber, aadhaarNumber, fatherName, maritalStatus, addressLine1, addressLine2, pincode, city, state, residentialStatus, photoUrl, aadhaarUrl, panUrl} = req.body;
  const address = `${addressLine1}, ${addressLine2}`;
  try {
    const existingProfile = await db.query(
      "SELECT kyc_id FROM kyc WHERE kyc_id = $1",
      [borrowerId]
    );

    let profile;
    if (existingProfile.rows.length > 0) {
      return res.status(200).json({
        success: true,
        message: "KYC form already submitted!",
        data: existingProfile.rows[0],
      });
    } else {
      const query = `
                INSERT INTO kyc (kyc_id, full_name, dob, gender, pan_no, aadhaar_no, father_name, marital_status, address, pincode, city, state, residential_status, photo_url, aadhaar_url, pan_url, kyc_status)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17) RETURNING *;
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
        kyc_status
      ];
      const { rows } = await db.query(query, values);
      profile = rows[0];
      return res.status(201).json({
        success: true,
        message: "KYC submitted successfully",
        data: profile,
      });
    }
  } catch (error) {
    console.error("KYC Submission Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const loanApplication = async (req, res) => {
  const borrowerId = req.user.id;
  const status = 'pending';
  const { full_name, email, mobile_no, dob, gender, pan_no, aadhaar_no, address, pincode, city, state, residential_status, years_at_current_address, employment_type, bank_name , bank_account_no , ifsc_code, loan_amount, purpose_of_loan, loan_tenure, itr_url, bank_statement_url} = req.body;
  try {
    const existingProfile = await db.query(
      "SELECT borrower_id FROM borrower WHERE borrower_id = $1",
      [borrowerId]
    );

    let profile;
    if (existingProfile.rows.length == 0) {
      return res.status(200).json({
        success: true,
        message: "Borrower does not exist!",
      });
    } else {
      if(existingProfile.rows[0].kyc_status === 'pending' || existingProfile.rows[0].kyc_status === 'rejected'){
        return res.status(400).json({
          success: false,
          message: "KYC pending!",
        });
      }
      const query = `
                INSERT INTO loan_application (borrower_id, full_name, email, mobile_no, dob, gender, pan_no, aadhaar_no, address, pincode, city, state, residential_status, years_at_current_address, employment_type, bank_name, bank_account_no, ifsc_code, loan_amount, purpose_of_loan, loan_tenure, itr_url, bank_statement_url, status)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22) RETURNING *;
            `;
      const values = [
        borrowerId,
        full_name,
        email,
        mobile_no,
        dob,
        gender,
        pan_no,
        aadhaar_no,
        address,
        pincode,
        city,
        state,
        residential_status,
        years_at_current_address,
        employment_type,
        bank_name,
        bank_account_no,
        ifsc_code,
        loan_amount,
        purpose_of_loan,
        loan_tenure,
        itr_url,
        bank_statement_url,
        status
      ];
      const { rows } = await db.query(query, values);
      profile = rows[0];
      return res.status(201).json({
        success: true,
        message: "Loan application submitted successfully",
        data: profile,
      });
    }
  } catch (error) {
    console.error("Loan Application Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
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

const dashboard = async (req, res) => {
  res
    .status(501)
    .json({
      success: false,
      message: "Dashboard not implemented. Requires additional logic.",
    });
};

export { dashboard, kyc, loanApplication, getBorrowerProfile };
