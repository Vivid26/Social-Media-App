import { addUser, findUser, allUsers, updateUser, findToken, getTotalCountsOfUsers, findAndDeleteTokens } from "../model/user.repository.js";
import { customErrorHandler } from "../../../middlewares/errorHandler.middleware.js"
import { sendToken } from "../../../utils/sendToken.js";
import mongoose from "mongoose";

//Sign-In
export const registerUser = async (req, res, next) => {
	const userData = req.body;
	try {
		if (userData) {
			const user = await addUser(userData);
			await sendToken(user, res, 201, `Hey ${user.name}, you registered successfully.`);
		}
		else {
			return next(new customErrorHandler(400, JSON.stringify({ success: false, message: "Invalid User details." })));
		}
	} catch (error) {
		return next(new customErrorHandler(400, JSON.stringify({ success: false, message: "Error while registration." })));
	}
};

//Sign-out
export const userLogin = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return next(new customErrorHandler(400, JSON.stringify({ success: false, message: "Please enter email/password" })));
		}
		const user = await findUser({ email }, true);
		if (!user) {
			return next(
				new customErrorHandler(401, JSON.stringify({ success: false, message: "User not found! register yourself now!!" }))
			);
		}
		const passwordMatch = await user.comparePassword(password);
		if (!passwordMatch) {
			return next(new customErrorHandler(401, JSON.stringify({ success: false, message: "Invalid email or passsword!" })));
		}
		await sendToken(user, res, 200, "Login Successful!");
	} catch (error) {
		return next(new customErrorHandler(400, JSON.stringify({ success: false, message: "Error while login." })));
	}
};


//Logout
export const userLogout = async (req, res, next) => {
	const { jwtToken } = req.cookies;
	const token = await findToken(jwtToken);
	const user = await findUser({ _id: token.userId });
	await user.removeToken(token);
	await user.save();
	res.clearCookie("jwtToken").status(200).json({ success: true, message: "User logged out successfully." });
};


export const logoutFromAllDevices = async (req, res, next) => {
	const { jwtToken } = req.cookies;
	const token = await findToken(jwtToken);
	const user = await findUser({ _id: token.userId });
	user.tokens = [];
	user.save();
	await findAndDeleteTokens(token.userId);
	res.clearCookie("jwtToken").status(200).json({ success: true, message: "User logged out successfully from all active sessions." });
}



//User Profile related opertions

export const getUserDetails = async (req, res, next) => {
	try {
		const user = await findUser({ _id: req.params.userId });
		if (!user) {
			return next(
				new customErrorHandler(401, JSON.stringify({ success: false, message: "User not found! register yourself now!!" }))
			);
		}
		res.status(200).json({ success: true, result: user });
	} catch (error) {
		return next(new customErrorHandler(400, JSON.stringify({ success: false, message: "Error occured while getting user details." })));
	}
};

export const getAllUsers = async (req, res, next) => {
	const { page, pageSize } = req.query;

	//pagination
	const pageNumber = parseInt(page) || 1;
	const skip = (pageNumber - 1) * pageSize;
	try {
		const allUsersDetails = await allUsers(skip, pageSize);
		const totalUsers = await getTotalCountsOfUsers({});

		res
			.status(200)
			.json(
				{
					success: true,
					Users: {
						totalUsersCount: totalUsers,
						totalPages: Math.ceil(totalUsers / pageSize),
						currentPage: page,
						result: allUsersDetails
					}
				});
	} catch (error) {
		return next(new customErrorHandler(400, JSON.stringify({ success: false, message: "Error occured while getting all user details." })));
	}
};

export const updateUserProfile = async (req, res, next) => {
	const profileImgUrl = req.file.filename;
	try {
		const updatedUserDetails = await updateUser(new mongoose.Types.ObjectId(req.params.userId), req.body.role, profileImgUrl);
		res.status(201).json({ success: true, result: updatedUserDetails });
	} catch (error) {
		return next(new customErrorHandler(400, JSON.stringify({ success: false, message: "Error occured while updating user details." })));
	}
};
