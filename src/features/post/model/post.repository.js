import PostModel from "./post.schema.js";


export const getPost = async (postId) => {
    return await PostModel.findOne({_id:postId},"userId caption imageUrl state").populate("userId",{ _id: 1, name: 1, email: 1, role: 1 });
}

export const getAll = async (skip,pageSize) => {
    return await PostModel.find({state:"publish"},"userId caption imageUrl state")
    .populate("userId",{ _id: 1, name: 1, email: 1, role: 1 })
    .skip(skip)
    .limit(pageSize)
    .sort({createdAt: -1});
}

export const getTotalCount = async (query) => {
    return await PostModel.find(query).count();
};


export const getPublishedPosts = async (userId) => {
        return await PostModel.find({state:"publish",userId:userId},"userId caption imageUrl state")
        .populate("userId",{ _id: 1, name: 1, email: 1, role: 1 })
        .sort({createdAt: -1});
}

export const getDraftedPosts = async (userId) => {
    return await PostModel.find({state:"draft",userId:userId},"userId caption imageUrl state")
    .populate("userId",{ _id: 1, name: 1, email: 1, role: 1 })
    .sort({createdAt: -1});
}

export const getArchievedPosts = async (userId) => {
    return await PostModel.find({state:"archieve",userId:userId},"userId caption imageUrl state")
    .populate("userId",{ _id: 1, name: 1, email: 1, role: 1 })
    .sort({createdAt: -1});

}


export const getUserPosts = async (userId) => {

    return { 
        publishedPosts: await getPublishedPosts(userId),
        draftedPosts: await getDraftedPosts(userId),
        archivedPosts: await getArchievedPosts(userId)
    };
}

export const getPostByCaption = async (query,skip,pageSize) => {
    return await PostModel.find(query,"userId caption imageUrl state")
    .populate("userId",{ _id: 1, name: 1, email: 1, role: 1 })
    .skip(skip).limit(pageSize).sort({createdAt: -1});
}

export const create = async (userId, caption, imageUrl) => {
    return await new PostModel({userId, caption, imageUrl}).save();
}

export const updatePost = async (postId,userId, caption, imageUrl) => {
    let success = false;
    let post = await PostModel.findById(postId);
    if(post && post.userId == userId){
        if(caption){
            post.caption = caption;
        }
        if(imageUrl){
            post.imageUrl = imageUrl;
        }
        await post.save();
        success = true;
    }
    return success;
}

export const deletePost = async (postId,userId) => {
    let success = false;

    const post = await PostModel.findById(postId);
    
    if(post.userId == userId){
      await PostModel.findByIdAndDelete(postId);
      success = true;
    }
    return success;
}

export const archieve = async (postId,userId) => {
    let success = false;
    let post = await PostModel.findById(postId);
    if(post && post.userId == userId){
        post.state = "archieve"
        await post.save();
        success = true;
    }
    return success;
}

export const publish = async (postId,userId) => {
    let success = false;
    let post = await PostModel.findById(postId);
    if(post && post.userId == userId){
        post.state = "publish"
        await post.save();
        success = true;
    }
    return success;
}

