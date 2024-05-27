import CommentModel from "./comment.schema.js";
import PostModel from "../../post/model/post.schema.js";


export const addComment = async (userId,postId,content) => {
    const post = await PostModel.findById(postId);
    if(post){
        return await new CommentModel({userId, postId, content}).save();
    }
    return null;
}

export const getAllComment = async (userId,postId) => {
    return await CommentModel.find({userId:userId,postId:postId},"userId postId content")
    .populate({path:"postId",model:"Post",populate:{path:"userId",model:"User",select:{ _id: 1, name: 1, email: 1, role: 1 }}, select:{createdAt:0,updatedAt:0,__v:0}})
    .populate("userId",{ _id: 1, name: 1, email: 1, role: 1 })
}


export const updateComment = async (_id,userId,newContent) => {
    const comment = await CommentModel.findById(_id);
    
    if(comment && comment.userId == userId){
        comment.content = newContent;
        return await comment.save();
    }
    return null;
};

export const deleteComment = async (_id,userId) => {
    const comment = await CommentModel.findById(_id);
    
    if(comment && comment.userId == userId){
      return await CommentModel.findByIdAndDelete(_id);
    }
    return 0;
};

export const getAll = async (query, skip, pageSize) => {
    const result = await CommentModel.find(query,"userId postId content")
    .populate({path:"postId",model:"Post",populate:{path:"userId",model:"User",select:{ _id: 1, name: 1, email: 1, role: 1 }}, select:{createdAt:0,updatedAt:0,__v:0}})
    .populate("userId",{ _id: 1, name: 1, email: 1, role: 1 })
    .skip(skip).limit(pageSize);
    return result;
}

export const getTotalCount = async (query) => {
    return await CommentModel.find(query);
};