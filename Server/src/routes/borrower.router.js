import express from "express";
import {dashboard,kyc,loanApplication,getBorrowerProfile} from "../controllers/borrower.controller.js";
import protect from "../middlewares/auth.middleware.js";
import {upload} from "../utils/cloudinary.js";

const borrower_router = express.Router();

borrower_router.route('/dashboard').get(protect,dashboard);
borrower_router.route('/kyc').post(
  protect, 
  upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "pan", maxCount: 1 },
    { name: "aadhaar", maxCount: 1 },
  ]),
  kyc
);
borrower_router.route('/profile').get(protect,getBorrowerProfile);
borrower_router.route('/loanapplication').post(protect,loanApplication);

export default borrower_router;