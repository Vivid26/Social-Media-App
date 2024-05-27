import OtpModel from "./otp.schema.js";
import UserModel from "../../user/model/user.schema.js"
import TokenModel from "../../user/model/token.schema.js";

import { sendResetPasswordOtpEmail } from "../../../utils/resetPasswordToken.js"


export const send = async (email) => {

    const user = await UserModel.findOne({ email });
        if (!user) {
               throw new customErrorHandler(401, JSON.stringify({ status: "failure", message: "User not found! register yourself now!!" }))
        }

    const otp = generateOTP();
    const filter = {_id:user._id}
    const update = {
        resetPasswordOtp : otp,
        resetPasswordExpire : Date.now() + 10 * 60 * 1000
    }
    const updatedUser = await UserModel.findOneAndUpdate(filter,update,{new:true});
    
    await new OtpModel({ userId: updatedUser._id, otp }).save()
    await sendResetPasswordOtpEmail(updatedUser, otp);
}

export const verify = async (userId, otp) => {
    return await OtpModel.findOne({ userId, otp });
}


export const otpValidity = async (otp) => {
    return await UserModel.findOne({
        resetPasswordOtp: otp.toString(),
        resetPasswordExpire: { $gt: Date.now() },
    });
}


export const findUser = async (filter) => {
    return UserModel.findOne(filter);
}

export const deleteOTP = async (filter) => {
    return OtpModel.deleteOne(filter);
}

const generateOTP = () =>{
    const randomNum = Math.random() * 9000;
    const otp = Math.floor(1000 + randomNum);
    return Number(otp);
}

export const findAndDeleteTokens = async (userId) => {
    return await TokenModel.deleteMany({ userId })
}

export const findToken = async (jwtToken) => {
    return await TokenModel.findOne({ token: jwtToken });
}