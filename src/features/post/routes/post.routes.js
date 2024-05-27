import express from "express";
import { getAllPosts, getPostById,getPostsByUser, createPost, updatePostById, deletePostById, getAllPostsByCaption,archievePost, publishPost} from "../controller/post.controller.js";
import { uploadFile } from "../../../middlewares/fileupload.middleware.js";

const postRouter = express.Router();

//filter posts by caption
postRouter.route("/filter").get(getAllPostsByCaption);
//archieve post
postRouter.route("/archieve/:postId").put(archievePost);
//publish post
postRouter.route("/publish/:postId").put(publishPost);

postRouter.route("/all").get(getAllPosts);
postRouter.route("/:postId").get(getPostById);
postRouter.route("/").get(getPostsByUser);
postRouter.route("/").post(uploadFile.single('imageUrl'),createPost);
postRouter.route("/:postId").put(uploadFile.single('imageUrl'),updatePostById);
postRouter.route("/:postId").delete(deletePostById);

export default postRouter;