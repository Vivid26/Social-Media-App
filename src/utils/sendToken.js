// create token and save into cookie
import TokenModel from "../features/user/model/token.schema.js";
import UserModel from "../features/user/model/user.schema.js";


export const sendToken = async (user, res, statusCode,message) => {
  const token = user.getJWTToken();

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  const newToken = await new TokenModel({userId:user._id,token}).save();
  user.tokens.push(newToken._id.toString());
  await user.save();
  
  const userDetails = await UserModel.findById(user._id).select({name:1,email:1,role:1,_id:0});
  res
    .status(statusCode)
    .cookie("jwtToken", token, cookieOptions)
    .json({ success: true,message, userDetails, token });
    
};
