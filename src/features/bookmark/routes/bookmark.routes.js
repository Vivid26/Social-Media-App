import express from "express";

import { getBookmarksByUser, togglePostBookmark } from "../controller/bookmark.controller.js";

const bookmarkRouter = express.Router();

bookmarkRouter.route("/").get(getBookmarksByUser);
bookmarkRouter.route("/toggle/:postId").get(togglePostBookmark);

export default bookmarkRouter;