import express from "express";
import {dashboard, getBorrowerLoans, getBorrowerLoan, getRepayments, markInstallmentPaid, kyc, loanApplication, getBorrowerProfileBasic, getBorrowerProfilePrivate, validate, acceptOffer, rejectOffer} from "../controllers/borrower.controller.js";
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
//borrower_router.route('/profile').get(protect,getBorrowerProfile);
borrower_router.route('/loanapplication').post(protect,loanApplication);
borrower_router.route('/me').get(protect, validate);
borrower_router.route('/profile-basic').get(protect,getBorrowerProfileBasic);
borrower_router.route('/profile-private').get(protect,getBorrowerProfilePrivate);
borrower_router.route('/dashboard').get(protect,dashboard);
borrower_router.route('/loans').get(protect, getBorrowerLoans );
borrower_router.route('/loan/:loanId').get(protect, getBorrowerLoan );
borrower_router.route('/repayments').get(protect, getRepayments);
borrower_router.route('/mark-paid').post(protect, markInstallmentPaid);
borrower_router.route("/offers/:offerId/accept").post(protect, acceptOffer);
borrower_router.route('/offers/:offerId/reject').post(protect, rejectOffer);

export default borrower_router;