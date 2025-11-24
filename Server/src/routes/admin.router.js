import express from "express";
import {dashboard,kyc,loanApplication, getAllBorrowers, getAllLenders} from "../controllers/admin.controller.js";
import protect from "../middlewares/auth.middleware.js";
import { checkAadhaar } from "../controllers/admin.controller.js";
import axios from "axios";

const admin_router = express.Router();

admin_router.route('/dashboard').get(dashboard);
admin_router.route('/kyc').get(kyc);
admin_router.route('/loanapplication').get(loanApplication);
admin_router.route('/borrowers').get(getAllBorrowers);
admin_router.route('/lenders').get(getAllLenders);
admin_router.route('/check-aadhaar/:aadhaarNumber').get(checkAadhaar);
admin_router.route('/credit-score').post(async (req, res) => {
  try {
    const { features } = req.body;
    const response = await axios.post("http://127.0.0.1:5000/predict", {
      features
    });

    res.json({
      success: true,
      prediction: response.data.prediction
    });
  } catch (error) {
    console.error("Error connecting to Flask API:", error.message);
    res.status(500).json({
      success: false,
      error: "Failed to get prediction from Flask API"
    });
  }
});

export default admin_router;