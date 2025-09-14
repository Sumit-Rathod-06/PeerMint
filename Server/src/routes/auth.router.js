import express from "express";
import {registerBorrower, registerLender, loginBorrower, loginLender} from "../controllers/auth.controller.js";

const auth_router = express.Router();

auth_router.route('/register/borrower').post(registerBorrower);
auth_router.route('/register/lender').post(registerLender);
auth_router.route('/login/borrower').post(loginBorrower);
auth_router.route('/login/lender').post(loginLender);

export default auth_router;