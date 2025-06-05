import { Router } from "express";
import authverfication from "../middlewares/auth.middlewares.js";
import { createPost } from "../controllers/post.controller.js";

const postrouter = Router();

postrouter.post('/createpost', authverfication, createPost);


export default postrouter;