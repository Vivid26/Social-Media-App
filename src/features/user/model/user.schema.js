import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import TokenModel from "./token.schema.js"

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "User name is required"],
    maxLength: [30, "User name can't exceed 30 characters"],
    minLength: [2, "User name should have atleast 2 charcters"],
  },
  email: {
    type: String,
    required: [true, "User email is required"],
    unique: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    select: false,
  },
  gender: {
    type: String,
    required: [true, "Please mention your gender."],
  },
  profileImgUrl: {
      type: String,
      required: true,
      default: "this is dummy avatar url",  
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin"],
  },
  resetPasswordOtp: String,
  resetPasswordExpire: Date,
  friends:[
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
  ],  
  tokens: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref:"Token"
    }
  ],
},{ timestamps: true });

userSchema.pre("save", async function (next) {
  //  hash user password before saving using bcrypt
  if(!this.isModified('password')){
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12); 
  next();
});

// JWT Token
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// user password compare
userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.removeToken = async function (jwtToken) {
  const index = (this.tokens).findIndex((obj) => (obj == (jwtToken._id).toString()));
  if(index>= 0){
    this.tokens.splice(index,1);
  }
  await TokenModel.findByIdAndDelete(jwtToken._id); 
  return;
};

const UserModel = mongoose.model("User", userSchema);
export default UserModel;
