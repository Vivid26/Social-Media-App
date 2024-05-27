import FriendshipModel from "./friendship.schema.js";
import UserModel from "../../user/model/user.schema.js";


export const myAllFriends = async (userId) => {
    const user = await UserModel.findById(userId).populate("friends", { _id: 1, name: 1, email: 1, role: 1 });
    return user.friends;

}

//pending friend requests are those whose 'friend_request_status' is 'pending'
export const pendingFriendRequests = async (userId) => {
    return {
        pending: await getPendingFriendRequests(userId)
    };
}

//Functionality to send friend request to a friend 
export const friendRequest = async (friend1, friend2) => {
    const user1 = await UserModel.findById(friend1);
    const user2 = await UserModel.findById(friend2);

    if (isFriend(user1,friend2) || isFriend(user2,friend1)) return "friend";

    await new FriendshipModel({ friend1:friend2, friend2:friend1 }).save();
    return "sent"
}

// new friendship creation
export const doFriendship = async (friend1, friend2) => {
    const user1 = await UserModel.findById(friend1);
    const user2 = await UserModel.findById(friend2);

    addToFriendList(user1,friend2);
    addToFriendList(user2,friend1);
    return await new FriendshipModel({ friend1, friend2, friend_request_status: "accepted" }).save();
}


//  you can toggle only -
// if friend1 & friend2 are in friendship or friend1 & friend2 are not in friendship
// when 'friend_request_status' eigther be "accepted" or no friendship in exist.
// when 'friend_request_status' is "rejected".
export const toggle = async (friend1, friend2) => {
    const user1 = await UserModel.findById(friend1);
    const user2 = await UserModel.findById(friend2);

    const relation1 = await isAlreadyInFriendship(friend1, friend2);
    const relation2 = await isAlreadyInFriendship(friend2, friend1);


    if(!(relation1) && !(relation2)){
        const friend = await doFriendship(friend1,friend2);
        return "new"
    } 

    const relation = relation1?  relation1 : relation2;

    if(relation && relation.friend_request_status == "accepted"){
        removeFromFriendList(user1,friend2 );
        removeFromFriendList(user2,friend1);
        relation.friend_request_status ="rejected";
        await relation.save();
        return "broken"
    }

    if(relation && relation.friend_request_status == "rejected"){
        addToFriendList(user1,friend2);
        addToFriendList(user2,friend1);
        relation.friend_request_status ="accepted";
        await relation.save();
        return "renew"
    }
    return "error"
}

// This functionality is for accepting or rejecting friend request which are received from others.
// this means friend request which has "friend_request_status" is "pending".
export const acceptOrRejectFriendship = async (friend1, friend2, action) => {
    const user1 = await UserModel.findById(friend1);
    const user2 = await UserModel.findById(friend2);
    const friendship = await FriendshipModel.findOne({ friend1,friend2,friend_request_status:"pending" });

    if(!friendship){
        return "error"
    }

    if(action === "accept"){
        addToFriendList(user1,friend2);
        addToFriendList(user2,friend1);
        friendship.friend_request_status ="accepted";
        await friendship.save();        
        return true;
    }

    if(action === "reject"){
        removeFromFriendList(user1,friend2 );
        removeFromFriendList(user2,friend1);
        friendship.friend_request_status ="rejected";
        await friendship.save(); 
        return false;
    }
    return "error"
}







//supplementary functions
const isFriend = (doc,id) => {
    const result = doc.friends.find((p)=> p == id.toString());
    return result;
}

const isAlreadyInFriendship = async (friend1,friend2) => {
    const friendship = await FriendshipModel.findOne({ friend1,friend2 });
    return friendship;
}

const addToFriendList = async (doc,friendId) => {
    doc.friends.push(friendId.toString());
    doc.save();
}

const removeFromFriendList = async (doc,friendId) => {
    const index = doc.friends.findIndex(id => id == (friendId).toString());
    doc.friends.splice(index, 1);
    await doc.save();
}

const getPendingFriendRequests = async (userId) => {
    const requests = await FriendshipModel.find({friend1:userId, friend_request_status:"pending"},"_id friend1 friend2 friend_request_status").populate("friend1", { _id: 1, name: 1, email: 1, role: 1 }).populate("friend2", { _id: 1, name: 1, email: 1, role: 1 });
    return requests;
}