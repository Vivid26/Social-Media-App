import express from "express";
import { friendshipAcceptReject, getMyFriends, getPendingFriendRequests, toggleFriendship, sendFriendRequest } from "../controller/friendship.controller.js";

const friendshipRouter = express.Router();

friendshipRouter.route("/get-friends").get(getMyFriends);
friendshipRouter.route("/get-pending-requests").get(getPendingFriendRequests);
friendshipRouter.route("/toggle-friendship/:friendId").get(toggleFriendship);
friendshipRouter.route("/send-friend-request/:friendId").get(sendFriendRequest);
friendshipRouter.route("/response-to-request/:friendId/:action").get(friendshipAcceptReject);


export default friendshipRouter;