import express from 'express';
import {register,login, logout, getUser, updateProfile, updatePassword} from '../controllers/user.controller.js'
import { isAuthenticated}  from '../middlewares/auth.middleware.js';

const router=express.Router();


//all user routes
router.post("/register",register);
router.post('/login',login);
router.get("/logout",isAuthenticated,logout);
router.get('/getuser',isAuthenticated,getUser);

router.put('/update/profile',isAuthenticated,updateProfile);

router.put("/update/password",isAuthenticated,updatePassword);






export default router;