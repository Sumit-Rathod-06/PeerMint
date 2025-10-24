import express from "express";
import {registerBorrower, registerLender, loginBorrower, loginLender} from "../controllers/auth.controller.js";
import jwt from "jsonwebtoken";
const auth_router = express.Router();

auth_router.route('/register/borrower').post(registerBorrower);
auth_router.route('/register/lender').post(registerLender);
auth_router.route('/login/borrower').post(loginBorrower);
auth_router.route('/login/lender').post(loginLender);
auth_router.get("/validate-token", (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ valid: false });

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    res.json({ valid: true, user: decoded });
  } catch (err) {
    res.status(403).json({ valid: false });
  }
});


export default auth_router;