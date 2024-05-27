import express from "express";
import { sendOtp,verifyOtp,resetPassword } from "../controller/otp.controller.js";

const otpRouter = express.Router();

otpRouter.route("/send").post(sendOtp);
otpRouter.route("/verify").post(verifyOtp);
otpRouter.route("/reset-password/:otp").post(resetPassword);

export default otpRouter;