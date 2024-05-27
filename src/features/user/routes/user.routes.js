import express from "express";
import { authByUserRole } from "../../../middlewares/adminAuthorization.middleware.js";
import jwtAuth from "../../../middlewares/jwtAuthentication.middleware.js";
import { userLogin, registerUser, userLogout,getAllUsers ,logoutFromAllDevices,getUserDetails,updateUserProfile} from "../controller/user.controller.js";
import { uploadFile } from "../../../middlewares/fileupload.middleware.js";


const userRouter = express.Router();

userRouter.route("/sign-up").post(registerUser);
userRouter.route("/sign-in").post(userLogin);
userRouter.route("/sign-out").get(userLogout);
userRouter.route("/sign-out-from-all-devices").get(logoutFromAllDevices);

//User Profile
userRouter.route("/get-details/:userId").get(jwtAuth,getUserDetails);
userRouter.route("/update-details/:userId").put(jwtAuth,uploadFile.single("profileImgUrl"),updateUserProfile);

//Admin access
userRouter.route("/admin/get-all-user-details").get(jwtAuth, authByUserRole("admin"),getAllUsers);


export default userRouter;