import express from "express";
import { getAllCommentsById , createCommentById, updateCommentById, deleteCommentById, getAllComments} from "../controller/comment.controller.js";

const commentRouter = express.Router();

commentRouter.route("/all/:postId").get(getAllComments);

commentRouter.route("/:postId").get(getAllCommentsById);
commentRouter.route("/:postId").post(createCommentById);
commentRouter.route("/:commentId").put(updateCommentById);
commentRouter.route("/:commentId").delete(deleteCommentById);

export default commentRouter;