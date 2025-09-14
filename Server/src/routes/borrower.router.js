import express from "express";
import {dashboard,kyc,loanApplication,getBorrowerProfile} from "../controllers/borrower.controller.js";
import protect from "../middlewares/auth.middleware.js";

const borrower_router = express.Router();

borrower_router.route('/dashboard').get(protect,dashboard);
borrower_router.route('/kyc').post(protect,kyc);
borrower_router.route('/profile').get(protect,getBorrowerProfile);
borrower_router.route('/loanapplication').post(protect,loanApplication);

export default borrower_router;