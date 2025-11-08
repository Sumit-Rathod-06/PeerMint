import express from "express";
import { getLoanApplications, fundLoan } from "../controllers/lender.controller.js";
import protect from "../middlewares/auth.middleware.js";

const lender_routes = express.Router();

// GET all loan applications for lenders to browse
lender_routes.route("/loan-applications").get(protect, getLoanApplications);
lender_routes.route("/fund-loan").post(protect, fundLoan);

export default lender_routes;