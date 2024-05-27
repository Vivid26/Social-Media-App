import jwt from "jsonwebtoken";
import { customErrorHandler } from "./errorHandler.middleware.js";
import UserModel from "../features/user/model/user.schema.js"
import TokenModel from "../features/user/model/token.schema.js";


const jwtAuth = (req,res,next) => {

    const { jwtToken } = req.cookies;
    try{
        jwt.verify(jwtToken, process.env.JWT_SECRET , async(err,decoded) => {
            if(err){
                console.log(err);
               return next( new customErrorHandler(401, JSON.stringify({ success: false, message: "Log-In to continue."})));
            } else {
                const validToken = await TokenModel.findOne({token:jwtToken});
                if(!validToken){
                    return next( new customErrorHandler(401, JSON.stringify({ success: false, message: "Your session is not active."})));
                }
                const userPayload = decoded;
                req.userId = userPayload.userId;
                req.user = await UserModel.findById(req.userId);
                req.token = validToken;
    
                next();
            }
        });
    }catch(error){
        return next( new customErrorHandler(401, JSON.stringify({ success: false, message: "Log-In to continue."})));
    }
    
};


export default jwtAuth;