import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../config/db.js";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "1d",
  });
};

const registerBorrower = async (req, res) => {
  const { email, phone_number, password, first_name, last_name} = req.body;
  console.log(req.body);
  try {
    const userExists = await db.query("SELECT * FROM borrower WHERE email = $1", [
      email,
    ]);
    if (userExists.rows.length > 0) {
      return res
        .status(409)
        .json({ success: false, message: "Email already in use" });
    }

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);
    const kyc_status = 'pending';

    const query = `
      INSERT INTO borrower(email, phone_number, password_hash, first_name, last_name, kyc_status)
      VALUES($1, $2, $3, $4, $5, $6) RETURNING *;
    `;
    const values = [
      email,
      phone_number, 
      password_hash,
      first_name,
      last_name,
      kyc_status,
    ];
    const { rows } = await db.query(query, values);
    const newUser = rows[0];

    res.status(201).json({
      success: true,
      message: "Registration successful.",
      user: newUser,
    });
  } catch (error) {
    console.error("Registration Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error during registration" });
  }
};

const loginBorrower = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { rows } = await db.query("SELECT * FROM borrower WHERE email = $1", [
      email,
    ]);
    const user = rows[0];

    if (user && (await bcrypt.compare(password, user.password_hash))) {
      res.json({
        success: true,
        token: generateToken(user.borrower_id),
        user: { id: user.id, email: user.email },
      });
    } else {
      res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Login Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error during login" });
  }
};

const loginLender = async (req, res) => {
  res
    .status(501)
    .json({
      success: false,
      message: "Login Lender not implemented. Requires additional logic.",
    });
};

const registerLender = async (req, res) => {
  res
    .status(501)
    .json({
      success: false,
      message: "Register Lender not implemented. Requires additional logic.",
    });
};

export { registerBorrower, registerLender, loginBorrower, loginLender };
