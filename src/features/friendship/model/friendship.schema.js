import mongoose from "mongoose";

const friendshipSchema = new mongoose.Schema({
    friend1:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    friend2:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    friend_request_status:{
        type:String,
        enum:["accepted","rejected","pending"],
        default: "pending"
      }
    
},{ timestamps: true });

const FriendshipModel = mongoose.model("Friendship",friendshipSchema);
export default FriendshipModel;