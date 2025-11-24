import express from "express";
import {dashboard,kyc,loanApplication} from "../controllers/admin.controller.js";
import protect from "../middlewares/auth.middleware.js";

const admin_router = express.Router();

admin_router.route('/dashboard').get(dashboard);
admin_router.route('/kyc').get(kyc);
admin_router.route('/loanapplication').get(loanApplication);

export default admin_router;