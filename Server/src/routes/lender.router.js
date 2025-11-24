import express from "express";
import { getLoanApplications, fundLoan, offerLoan, getLenderSummary, getLenderDashboard, getLenderTransactions, getLenderPortfolio } from "../controllers/lender.controller.js";
import protect from "../middlewares/auth.middleware.js";

const lender_routes = express.Router();

// GET all loan applications for lenders to browse
lender_routes.route("/loan-applications").get(protect, getLoanApplications);
lender_routes.route("/fund-loan").post(protect, fundLoan);
lender_routes.route("/summary").get(protect, getLenderSummary);
lender_routes.route("/dashboard").get(protect, getLenderDashboard);
lender_routes.route("/transactions").get(protect, getLenderTransactions);
lender_routes.route("/portfolio").get(protect, getLenderPortfolio);
lender_routes.route("/offer-loan").post(protect, offerLoan);

export default lender_routes;