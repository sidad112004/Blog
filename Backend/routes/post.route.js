import { Router } from "express";
import authverfication from "../middlewares/auth.middlewares.js";
import { createPost, deletePost, updatePost ,myposts, allPosts, visitedUserPosts} from "../controllers/post.controller.js";

const postrouter = Router();

postrouter.post('/createpost', authverfication, createPost);

postrouter.post('/deletepost', authverfication, deletePost);

postrouter.post('/updatepost', authverfication, updatePost); 

postrouter.get('/myposts', authverfication, myposts);

postrouter.get('/allposts',authverfication,allPosts);

postrouter.get('/visiteduserposts/:userId', authverfication, visitedUserPosts)

export default postrouter;
