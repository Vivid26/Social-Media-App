import { myAllFriends, pendingFriendRequests, toggle, acceptOrRejectFriendship, friendRequest } from "../model/friendship.repository.js";
import { customErrorHandler } from "../../../middlewares/errorHandler.middleware.js";


export const getMyFriends = async (req, res, next) => {
    const userId = req.userId;
    try {
        const result = await myAllFriends(userId);

        if (result.length) {
            res.status(200).json({ success: true, result: result });
        } else {
            return next(new customErrorHandler(404, JSON.stringify({ success: false, message: "Sorry! You don't have friends yet." })));
        }
    } catch (error) {
        return next(new customErrorHandler(400, JSON.stringify({ success: false, message: "Error to fetch friends list." })));
    }
}

export const getPendingFriendRequests = async (req, res, next) => {
    const userId = req.userId;

    try {
        const result = await pendingFriendRequests(userId);
        if (result) {
            res.status(200).json({ success: true, result: result });
        } else {
            return next(new customErrorHandler(404, JSON.stringify({ success: false, message: "No pending request." })));
        }
    } catch (error) {
        return next(new customErrorHandler(400, JSON.stringify({ success: false, message: "Error to fetch pending friend requests list." })));
    }

}

export const toggleFriendship = async (req, res, next) => {
    const friendId = req.params.friendId;
    const userId = req.userId;

    try {
        const result = await toggle(userId, friendId);

        if (result === "new") {
            res.status(201).json({ success: true, message: "Yeah! you are now friends of each other." })
        } else if (result === "broken") {
            res.status(200).json({ success: true, message: "Oops! Your friendship broken." })
        } else if (result === "renew") {
            res.status(200).json({ success: true, message: "You are again in friendship." })
        } else {
            return next(new customErrorHandler(404, JSON.stringify({ success: false, message: "Error occured or You are alredy in friendship." })));
        }
    } catch (error) {
        return next(new customErrorHandler(400, JSON.stringify({ success: false, message: "Error occured while toggle friendship." })));
    }
}

export const sendFriendRequest = async (req, res, next) => {
    const friendId = req.params.friendId;
    const userId = req.userId;

    try {
        const result = await friendRequest(userId, friendId);
        if (result === "sent") {
            return res.status(200).json({ success: true, message: "Friend request sent." });
        } else if (result === "friend") {
            return res.status(200).json({ success: true, message: "You are alredy in friendship." });
        }
    } catch (error) {
        return next(new customErrorHandler(400, JSON.stringify({ success: false, message: "Error occured while sending friend requests." })));
    }

}

export const friendshipAcceptReject = async (req, res, next) => {
    const { friendId, action } = req.params;
    const userId = req.userId;

    try {
        const success = await acceptOrRejectFriendship(userId, friendId, action);
        if (success ==="error") {
            return res.status(200).json({ success: true, message: "No friendship requests received." });
        }else if (success === true) {
            return res.status(200).json({ success: true, message: "Friendship accepted." });
        } else {
            return res.status(200).json({ success: true, message: "Friendship rejected." });
        }
    } catch (error) {
        return next(new customErrorHandler(403, JSON.stringify({ success: false, message: "Internal server error. Please try after some time." })));
    }

}
