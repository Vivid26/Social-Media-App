import mongoose from "mongoose";
import { toggle, getBookmarks } from "../model/bookmark.repository.js";
import { customErrorHandler } from "../../../middlewares/errorHandler.middleware.js";


export const getBookmarksByUser = async (req, res, next) => {
    const userId = req.userId;

    try {
        const result = await getBookmarks(userId);

        if (result.length) {
            res.status(200).json({ success: true, result: result });
        } else {
            return next(new customErrorHandler(404, JSON.stringify({ success: false, message: "Not yet bookmarked posts." })));
        }

    } catch (error) {
        return next(new customErrorHandler(400, JSON.stringify({ success: false, message: "Error occured while bookmark a post." })));
    }

}

export const togglePostBookmark = async (req, res, next) => {
    const postId = req.params.postId;
    const userId = req.userId;

    try {
        const result = await toggle(postId, userId);

        if (result === true) {
            res.status(200).json({ success: true, message: "Removed bookmark successfully." })
        } else if (result._id) {
            res.status(201).json({ success: true, message: "bookmarked successfully." })
        } else {
            return next(new customErrorHandler(404, JSON.stringify({ success: false, message: "Error occured while bookmark/remove bookmark a post." })));
        }
    } catch (error) {
        return next(new customErrorHandler(400, JSON.stringify({ success: false, message: "Error occured while bookmark/remove bookmark a post." })));
    }
}