import express from "express";

import { getLikesCount, likeOrDislikePost } from "../controller/like.controller.js";

const likeRouter = express.Router();

likeRouter.route("/:postId").get(getLikesCount);
likeRouter.route("/toggle/:postId").get(likeOrDislikePost);

export default likeRouter;