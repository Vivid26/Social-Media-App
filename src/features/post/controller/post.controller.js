import { getPost, getAll, getUserPosts, create, updatePost, deletePost, getPostByCaption, archieve, publish, getTotalCount } from "../model/post.repository.js"
import { customErrorHandler } from "../../../middlewares/errorHandler.middleware.js";

export const getPostById = async (req, res, next) => {
    const postId = req.params.postId;
    try {
        const post = await getPost(postId);
        if (post) {
            res.status(200).json({ success: true, result: post })
        } else {
            next(new customErrorHandler(404, JSON.stringify({ success: false, message: "Post not found. Please verify postId you want." })));
        }
    } catch (error) {
        next(new customErrorHandler(400, JSON.stringify({ success: false, message: "Error while getting a post." })));
    }
}

export const getAllPosts = async (req, res, next) => {

    const { page, pageSize } = req.query;

    //pagination
    const pageNumber = parseInt(page) || 1;
    const skip = (pageNumber - 1) * pageSize;

    try {
        const posts = await getAll(skip, pageSize);
        const totalPosts = await getTotalCount({ state: "publish" });

        if (posts.length) {
            res.status(200).json({
                success: true, posts: {
                    totalPostsCount: totalPosts,
                    totalPages: Math.ceil(totalPosts / pageSize),
                    currentPage: page,
                    result: posts
                }
            });
        } else {
            return next(new customErrorHandler(404, JSON.stringify({ success: false, message: "Error while fetching posts." })));
        }
    } catch (error) {
        return next(new customErrorHandler(400, JSON.stringify({ success: false, message: "Error while fetching posts." })));
    }

}

export const getPostsByUser = async (req, res, next) => {
    const userId = req.userId;
    try {
        const posts = await getUserPosts(userId);

        if (posts) {
            res.status(200).json({ success: true, result: posts });
        } else {
            return next(new customErrorHandler(404, JSON.stringify({ success: false, message: "Post not found." })));
        }
    } catch (error) {
        return next(new customErrorHandler(400, JSON.stringify({ success: false, message: "Error while fetching posts." })));
    }

}

export const getAllPostsByCaption = async (req, res, next) => {

    const { page, pageSize, caption } = req.query;

    //pagination
    const pageNumber = parseInt(page) || 1;
    const skip = (pageNumber - 1) * pageSize;

    let filter = {};
    if (caption) {
        filter.caption = { $regex: caption, $options: 'i' };
    }

    try {
        const posts = await getPostByCaption(filter, skip, pageSize);
        const totalPosts = await getTotalCount(filter);


        if (posts.length) {
            res.status(200).json({
                success: true, posts: {
                    totalPostsCount: totalPosts,
                    totalPages: Math.ceil(totalPosts / pageSize),
                    currentPage: page,
                    result: posts
                }
            });
        } else {
            return next(new customErrorHandler(404, JSON.stringify({ success: false, message: "Error while fetching posts." })));
        }
    } catch (error) {
        return next(new customErrorHandler(400, JSON.stringify({ success: false, message: "Error while fetching posts." })));
    }

}

export const createPost = async (req, res, next) => {
    const userId = req.userId;
    const { caption } = req.body;
    const imageUrl = req.file.filename;

    try {
        const post = await create(userId, caption, imageUrl);

        if (post) {
            res.status(201).json({ success: true, message: "Post drafted successfully.", result: post });
        } else {
            return next(new customErrorHandler(400, JSON.stringify({ success: false, message: "Error while creating posts." })));
        }
    } catch (error) {
        return next(new customErrorHandler(400, JSON.stringify({ success: false, message: "Error while posting a post." })));
    }

}

export const publishPost = async (req, res, next) => {
    const userId = req.userId;
    const postId = req.params.postId;

    try {
        const success = await publish(postId, userId);

        if (success) {
            res.status(200).json({ success: true, message: "Post published successfully." });
        } else {
            return next(new customErrorHandler(400, JSON.stringify({ success: false, message: "Invalid postId supplied." })));
        }
    } catch (error) {
        return next(new customErrorHandler(400, JSON.stringify({ success: false, message: "Error while publishing a post." })));
    }

}

export const archievePost = async (req, res, next) => {
    const userId = req.userId;
    const postId = req.params.postId;

    try {
        const success = await archieve(postId, userId);

        if (success) {
            res.status(200).json({ success: true, message: "Post archieved successfully." });
        } else {
            return next(new customErrorHandler(400, JSON.stringify({ success: false, message: "Invalid postId supplied." })));
        }
    } catch (error) {
        return next(new customErrorHandler(400, JSON.stringify({ success: false, message: "Error while archieving a post." })));
    }

}

export const updatePostById = async (req, res, next) => {
    const userId = req.userId;
    const postId = req.params.postId;
    const { caption } = req.body;
    const imageUrl = req.file.filename;
    try {
        const success = await updatePost(postId, userId, caption, imageUrl);

        if (success) {
            res.status(200).json({ success: true, message: "Post updated successfully." });
        } else {
            return next(new customErrorHandler(400, JSON.stringify({ success: false, message: "Invalid postId supplied." })));
        }
    } catch (error) {
        return next(new customErrorHandler(400, JSON.stringify({ success: false, message: "Error while updating a post." })));
    }

}

export const deletePostById = async (req, res, next) => {
    const userId = req.userId;
    const postId = req.params.postId;
    try {
        const success = await deletePost(postId, userId);
        if (success) {
            res.status(200).json({ success: true, message: "Post deleted successfully." });
        } else {
            return next(new customErrorHandler(400, JSON.stringify({ success: false, message: "Invalid postId supplied." })));
        }
    } catch (error) {
        return next(new customErrorHandler(400, JSON.stringify({ success: false, message: "Error while deleting a post." })));
    }
}
