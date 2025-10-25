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

const loanApplication = async (req, res) => {
  console.log("Loan Application Request Body:", req.body);
  const borrowerId = req.user.id;
  const status = 'pending';
  const { fullName, email, mobile, dateOfBirth, gender, panNumber, aadhaarNumber, addressLine1, addressLine2, pincode, city, state, residentialStatus, yearsAtAddress, employmentType, bankName , accountNumber , ifscCode, loanAmount, loanPurpose, tenure} = req.body;
  const address = `${addressLine1}, ${addressLine2}`;
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
                INSERT INTO loan_application (borrower_id, full_name, email, mobile_no, dob, gender, pan_no, aadhaar_no, address, pincode, city, state, residential_status, years_at_current_address, employment_type, bank_name, bank_account_no, ifsc_code, loan_amount, purpose_of_loan, loan_tenure, status)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22) RETURNING *;
            `;
      const values = [
        borrowerId,
        fullName,
        email,
        mobile,
        dateOfBirth,
        gender,
        panNumber,
        aadhaarNumber,
        address,
        pincode,
        city,
        state,
        residentialStatus,
        yearsAtAddress,
        employmentType,
        bankName,
        accountNumber,
        ifscCode,
        loanAmount,
        loanPurpose,
        tenure,
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
  res
    .status(501)
    .json({
      success: false,
      message: "Dashboard not implemented. Requires additional logic.",
    });
};

export { dashboard, kyc, loanApplication, getBorrowerProfile, uploadKycDocuments };
