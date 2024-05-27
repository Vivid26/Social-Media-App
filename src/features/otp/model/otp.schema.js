import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },  
    otp:{
        type: Number,
    },

},{timestamps:true});

const OtpModel = mongoose.model("Otp",otpSchema);
export default OtpModel;