import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },  
    token:{
        type: String,
        unique: true,
    }
},{timestamps:true});

const TokenModel = mongoose.model("Token",tokenSchema);
export default TokenModel;