import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import axios from "axios";
import auth_router from "./src/routes/auth.router.js";
import borrower_router from "./src/routes/borrower.router.js";
import admin_router from "./src/routes/admin.router.js";
import lender_routes from "./src/routes/lender.router.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
dotenv.config({path: "./src/config/.env"});

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  return res.status(200).send("Hello World!");
});

app.use('/api/auth', auth_router);
app.use('/api/borrower', borrower_router);
app.use('/api/admin', admin_router);
app.use('/api/lender', lender_routes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
