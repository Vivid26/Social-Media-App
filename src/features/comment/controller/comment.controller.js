import mongoose from "mongoose";

import { getAllComment, addComment, updateComment, deleteComment, getAll, getTotalCount } from "../model/comment.repository.js";
import { customErrorHandler } from "../../../middlewares/errorHandler.middleware.js";


export const getAllComments = async (req, res, next) => {
    const postId = req.params.postId;

    const { page, pageSize } = req.query;

    //pagination
    const pageNumber = parseInt(page) || 1;
    const skip = (pageNumber - 1) * pageSize;

    try {
        const comments = await getAll({ postId }, skip, pageSize);
        const result = await getTotalCount({ postId:postId });
        const totalComments = result.length;


        if (comments.length) {
            res.status(200)
                .json({
                    success: true,
                    comments: {
                        totalCommentsCount: totalComments,
                        totalPages: Math.ceil(totalComments / pageSize),
                        currentPage: page,
                        result: comments
                    }
                });
        } else {
            return next(new customErrorHandler(404, JSON.stringify({ success: false, message: "Respective post comments not found. Please verify postId that you want." })));
        }

    } catch (error) {
        return next(new customErrorHandler(400, JSON.stringify({ success: false, message: "Error while fetching all comments." })));
    }
}

export const getAllCommentsById = async (req, res, next) => {
    const postId = req.params.postId;
    const userId = req.userId;
    try {
        const comments = await getAllComment(userId, postId);

        if (comments.length) {
            res.status(200).json({ success: true, result: comments })
        } else {
            return next(new customErrorHandler(404, JSON.stringify({ success: false, message: "Respective post comments not found. Please verify postId that you want." })));
        }
    } catch (error) {
        return next(new customErrorHandler(400, JSON.stringify({ success: false, message: "Error while fetching all comments." })));
    }

}

export const createCommentById = async (req, res, next) => {
    const postId = req.params.postId;
    const userId = req.userId;
    const { content } = req.body;
    try {
        const comment = await addComment(userId, postId, content);
        if (comment) {
            return res.status(201).json({ success: true, message: "Comment added successfully.", result: comment })
        } else {
            return next(new customErrorHandler(404, JSON.stringify({ success: false, message: "Error while uploading comment. Please verify postId that you want." })));
        }
    } catch (error) {
        return next(new customErrorHandler(400, JSON.stringify({ success: false, message: "Error while commenting." })));
    }
}

export const updateCommentById = async (req, res, next) => {
    const commentId = req.params.commentId;
    const userId = req.userId;
    const { content } = req.body;
    try {
        const comment = await updateComment(commentId, userId, content);
        if (comment) {
            res.status(200).json({ success: true, message: "Comment updated successfully." })
        } else {
            return next(new customErrorHandler(400, JSON.stringify({ success: false, message: "Error while uploading comment. Please verify commentId that you want to update." })));
        }
    } catch (error) {
        return next(new customErrorHandler(400, JSON.stringify({ success: false, message: "Error while updating comment." })));
    }

}

export const deleteCommentById = async (req, res, next) => {
    const commentId = req.params.commentId;
    const userId = req.userId;
    try {
        const success = await deleteComment(commentId, userId);

        if (success) {
            res.status(200).json({ success: true, message: "Comment deleted successfully." });
        } else {
            return next(new customErrorHandler(400, JSON.stringify({ success: false, message: "Error while deleting comment.Please verify commentId that you want to update." })));
        }
    } catch (error) {
        return next(new customErrorHandler(400, JSON.stringify({ success: false, message: "Error while deleting comment." })));
    }
}