import { send, verify, findUser, otpValidity, deleteOTP, findAndDeleteTokens, findToken } from "../model/otp.repository.js"
import { customErrorHandler } from "../../../middlewares/errorHandler.middleware.js"

//Send OTP to registered email Id
export const sendOtp = async (req, res, next) => {
    const { email } = req.body;
    try {
        await send(email);
        res.status(200).json({ success: true, message: "OTP sent to your email id. " });
    } catch (error) {
        return next(
            new customErrorHandler(401, JSON.stringify({ success: false, message: "Error while sending OTP email." }))
        );
    }
}

//Verifies OTP generated for requested user
export const verifyOtp = async (req, res, next) => {
    const { otp, email } = req.body;
    try {
        const user = await findUser({ email });
        if (!user) {
            return next(
                new customErrorHandler(401, JSON.stringify({ success: false, message: "User not found! register yourself now!!" }))
            );
        }

        const result = await verify(user._id, otp)
        if (!result) {
            return next(
                new customErrorHandler(400, JSON.stringify({ success: false, message: "OTP is invalid. Please provide registered email id." }))
            );
        }
        res.status(200).json({ success: true, message: "OTP verified successfully. Now reset password using reset-password api. " });
    } catch (error) {
        return next(
            new customErrorHandler(401, JSON.stringify({ success: false, message: "Error while OTP verification." }))
        );
    }
}

//reset password after checking expiry for auto-generated OTP
export const resetPassword = async (req, res, next) => {
    const { jwtToken } = req.cookies;
    const { password, confirmPassword } = req.body;
    const token = await findToken(jwtToken);


    try {
        const user = await otpValidity(req.params.otp);
        if (!user) {
            return next(
                new customErrorHandler(401, JSON.stringify({ success: false, message: "OTP is expired. Please try again." }))
            );
        }
        if (!password || password !== confirmPassword) {
            return next(
                new customErrorHandler(401, JSON.stringify({ success: false, message: "Mismatch new password and confirm password!" }))
            );
        }

        user.password = password;
        user.resetPasswordExpire = null;
        user.resetPasswordOtp = ""
        user.tokens = [];
        await user.save();
        await findAndDeleteTokens(token.userId);
        await deleteOTP({ otp: req.params.otp });
        res.clearCookie("jwtToken").status(200).json({ success: true, message: "You reset password successfully. Login with your new password to continue." });
    } catch (error) {
        return next(
            new customErrorHandler(400, JSON.stringify({ success: false, message: "Error while OTP verification." }))
        );
    }
}
