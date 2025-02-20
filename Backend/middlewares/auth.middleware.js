import ErrorHandler from "./error.middlewares.js";
import jwt from 'jsonwebtoken';
import {User} from '../models/userSchema.model.js'



//authentication method
export const isAuthenticated=async(req,res,next)=>{
	try{
		const {token}=req.cookies;
		

		if(!token){
			return next(new ErrorHandler("User not Authenticated",400));
		}
		// console.log(token)

		const decodedToken= jwt.verify(token,process.env.JWT_SECRET_KEY);
		// console.log("decoded token: "+decodedToken);
		
		if(!decodedToken || !decodedToken.id){
			return next(new ErrorHandler("invaid token || id not found",400));
		}
		
		// console.log( "decoded id:"+decodedToken.id);
		req.user=await User.findById(decodedToken.id);

		next();
	}catch(err){
		console.log(`Error occured in authenticated middleware : ${err}`);
		next(new ErrorHandler("Authentication falied", 401));

	}
};


//authorization method based on role

export const isAuthorized=(...roles)=>{
	return(req,res,next)=>{
		if(!roles.includes(req.user.role)){
			return next(new ErrorHandler(`${req.user.role} not allowed ot access this resources..`));
		}

		next();
	}
}