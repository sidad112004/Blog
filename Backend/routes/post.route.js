import { Router } from "express";
import authverfication from "../middlewares/auth.middlewares.js";
import { createPost, deletePost, updatePost ,myposts, allPosts, visitedUserPosts} from "../controllers/post.controller.js";

const postrouter = Router();

postrouter.post('/createpost', authverfication, createPost);

postrouter.post('/deletepost', authverfication, deletePost);

postrouter.post('/updatepost', authverfication, updatePost); 

postrouter.post('/myposts', authverfication, myposts);

postrouter.post('/allposts',authverfication,allPosts);

postrouter.post('/visiteduserposts/:userId', authverfication, visitedUserPosts)

export default postrouter;
