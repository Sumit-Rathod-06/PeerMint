import express from "express";
import {dashboard,kyc,loanApplication, getAllBorrowers, getAllLenders} from "../controllers/admin.controller.js";
import protect from "../middlewares/auth.middleware.js";

const admin_router = express.Router();

admin_router.route('/dashboard').get(dashboard);
admin_router.route('/kyc').get(kyc);
admin_router.route('/loanapplication').get(loanApplication);
admin_router.route('/borrowers').get(getAllBorrowers);
admin_router.route('/lenders').get(getAllLenders);

export default admin_router;