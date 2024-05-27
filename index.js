import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import swagger from 'swagger-ui-express';
import apiDocs from './swagger.json' assert {type:'json'};

import userRouter from "./src/features/user/routes/user.routes.js";
import commentRouter from "./src/features/comment/routes/comment.routes.js";
import postRouter from "./src/features/post/routes/post.routes.js";
import likeRouter from "./src/features/like/routes/like.routes.js";
import bookmarkRouter from "./src/features/bookmark/routes/bookmark.routes.js";
import otpRouter from "./src/features/otp/routes/otp.routes.js";
import friendshipRouter from "./src/features/friendship/routes/friendship.routes.js";


import jwtAuth from "./src/middlewares/jwtAuthentication.middleware.js";

import { invalidRoutesHandlerMiddleware } from "./src/middlewares/invalidRoutes.middleware.js";
import { errorHandlerMiddleware } from "./src/middlewares/errorHandler.middleware.js";


const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.status(200).send("Welcome to Social Media NodeJs Application.");
});

app.use("/api/user", userRouter);

app.use("/api/comments",jwtAuth, commentRouter);

app.use("/api/posts",jwtAuth,postRouter);

app.use("/api/likes",jwtAuth,likeRouter);

app.use("/api/bookmarks",jwtAuth,bookmarkRouter);

app.use("/api/otp",jwtAuth,otpRouter);

app.use("/api/friends",jwtAuth,friendshipRouter);


// Middleware to handle errors
app.use(errorHandlerMiddleware);

app.use("/api-docs",swagger.serve, swagger.setup(apiDocs));

app.use(invalidRoutesHandlerMiddleware);



export default app;
