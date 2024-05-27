import BookmarkModel from "./bookmark.schema.js";
import PostModel from "../../post/model/post.schema.js";


export const bookmarkPost = async (postId, userId) => {
    const post = await PostModel.findById(postId);
    if (post) {
        return await new BookmarkModel({ userId, postId }).save();
    }
    return null;
}

export const getBookmarks = async (userId) => {
    return await BookmarkModel.find({ userId },"userId postId")
    .populate({path:"postId",model:"Post",populate:{path:"userId",model:"User",select:{ _id: 1, name: 1, email: 1, role: 1 }}, select:{createdAt:0,updatedAt:0,__v:0}})
    .populate("userId",{ _id: 1, name: 1, email: 1, role: 1 })
}


export const toggle = async (postId, userId) => {
    let flag = true;
    const bookmark = await BookmarkModel.findOne({ userId, postId });
    if (bookmark) {
        await BookmarkModel.findByIdAndDelete(bookmark._id);
        return flag;
    } else {
        return await bookmarkPost(postId, userId);
    }
}
