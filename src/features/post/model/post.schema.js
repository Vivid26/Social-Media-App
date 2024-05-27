import mongoose from "mongoose";


const postSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },  
    caption: {
        type: String,
        required: [true, "Caption is required."],
        trim: true,
      },
    imageUrl: {
        type: String,
        required: true,
      },
    state: {
        type: String,
        enum: ["draft","publish","archieve"],
        required: [true, "State is required."],
        default: "draft"
    },
},{ timestamps: true });

const PostModel = mongoose.model("Post",postSchema);
export default PostModel;