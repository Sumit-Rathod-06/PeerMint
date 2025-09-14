import express from "express";
import {dashboard,kyc,loanApplication} from "../controllers/admin.controller.js";
import protect from "../middlewares/auth.middleware.js";

const admin_router = express.Router();

admin_router.route('/dashboard').get(protect,dashboard);
admin_router.route('/kyc').get(protect,kyc);
admin_router.route('/loanapplication').get(protect,loanApplication);

export default admin_router;