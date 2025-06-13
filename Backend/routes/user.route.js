import { Router } from "express";
import { userinfo,registerUser,loginUser,logoutUser,updateProfile } from "../controllers/user.controller.js";
import authverfication from "../middlewares/auth.middlewares.js";


const router = Router();
router.route('/userinfo').get(authverfication, userinfo);

router.route('/register').post(registerUser);


router.route('/login').post(loginUser);

router.route('/logout').get(authverfication, logoutUser);

router.put('/update', authverfication, updateProfile);


export default router;