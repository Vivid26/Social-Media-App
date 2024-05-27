import LikeModel from "./like.schema.js";
import PostModel from "../../post/model/post.schema.js";


export const likePost = async (postId, userId) => {
    const post = await PostModel.findById(postId);
    if (post) {
        return await new LikeModel({ userId, postId }).save();
    }
    return null;
}

export const likeCount = async (postId) => {
    return await LikeModel.find({ postId: postId }, "userId postId")
    .populate({path:"postId",model:"Post",populate:{path:"userId",model:"User",select:{ _id: 1, name: 1, email: 1, role: 1 }}, select:{createdAt:0,updatedAt:0,__v:0}})
    .populate("userId",{ _id: 1, name: 1, email: 1, role: 1 })
}

export const toggle = async (postId, userId) => {
    let flag = true;
    const like = await LikeModel.findOne({ userId, postId });
    if (like) {
        await LikeModel.findByIdAndDelete(like._id);
        return flag;
    } else {
        return await likePost(postId, userId);
    }
}
