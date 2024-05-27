import UserModel from "./user.schema.js";
import TokenModel from "./token.schema.js";


export const addUser = async (data) => {
    return await new UserModel(data).save();
}

export const findUser = async (filter, withPassword = false) => {
    if (withPassword) return await UserModel.findOne(filter).select("+password");
    else return await UserModel.findOne(filter);
}

export const allUsers = async (skip, pageSize) => {
    return await UserModel.find({}).skip(skip).limit(pageSize).sort({ createdAt: -1 });
};

export const updateUser = async (_id, role, profileImgUrl) => {

    return await UserModel.findOneAndUpdate(_id, { role, profileImgUrl }, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
};

export const findToken = async (jwtToken) => {
    return await TokenModel.findOne({ token: jwtToken });
}

export const getTotalCountsOfUsers = async (query) => {
    return await UserModel.find(query).count();
};

export const findAndDeleteTokens = async (userId) => {
    return await TokenModel.deleteMany({ userId })
}