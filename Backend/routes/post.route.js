import { Router } from "express";
import authverfication from "../middlewares/auth.middlewares.js";
import { createPost, deletePost } from "../controllers/post.controller.js";

const postrouter = Router();

postrouter.post('/createpost', authverfication, createPost);

postrouter.post('/deletepost', authverfication, deletePost);


export default postrouter;
