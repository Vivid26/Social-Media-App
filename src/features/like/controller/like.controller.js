import { toggle, likeCount } from "../model/like.repository.js";
import { customErrorHandler } from "../../../middlewares/errorHandler.middleware.js";


export const getLikesCount = async (req, res, next) => {
    const postId = req.params.postId;
    const userId = req.userId;

    try {
        const result = await likeCount(postId);
        if (result.length) {
            res.status(200).json({ success: true, count: result.length, result: result });
        } else {
            next(new customErrorHandler(400, JSON.stringify({ success: false, message: "Respective post not yet liked." })));
        }
    } catch (error) {
        next(new customErrorHandler(400, JSON.stringify({ success: false, message: "Error occured during get like count of a post" })));
    }
}

export const likeOrDislikePost = async (req, res, next) => {
    const postId = req.params.postId;
    const userId = req.userId;

    try {
        const result = await toggle(postId, userId);

        if (result === true) {
            res.status(200).json({ success: true, message: "Removed like successfully." })
        } else if (result._id) {
            res.status(201).json({ success: true, message: "Liked successfully." })
        } else {
            next(new customErrorHandler(400, JSON.stringify({ success: false, message: "Error while like/dislike the post" })));
        }
    } catch (error) {
        next(new customErrorHandler(400, JSON.stringify({ success: false, message: "Error while like/dislike the post" })));
    }
}