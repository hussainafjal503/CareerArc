import { catchAsyncErrors } from "../middlewares/catchAsyncError.middleware.js";
import ErrorHandler from "../middlewares/error.middlewares.js";
import { User } from "../models/userSchema.model.js";
import { v2 as cloudinary } from "cloudinary";
import { sendToken } from "../utils/jwtToken.utils.js";

/****************************************
 *          REGISTER AND SIGNUP         *
 *****************************************/

export const register = async (req, res, next) => {
  try {
    const {
      name,
      email,
      phone,
      address,
      password,
      role,
      firstNiche,
      secondNiche,
      thirdNiche,
      coverLetter,
    } = req.body;

    //validating the required field must be inputed by the user
    if (!name || !email || !phone || !address || !password || !role) {
      return next(new ErrorHandler("All fields are required ...", 400));
    }

    // validating the required field for the job seeker
    if (role === "Job Seeker" && (!firstNiche || !secondNiche || !thirdNiche)) {
      return next(new ErrorHandler("Niche fields are required", 400));
    }

    // validating that user already exist or not
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new ErrorHandler("Email Already Exist", 400));
    }

    // creating object using user data
    const userData = {
      name,
      email,
      phone,
      address,
      password,
      role,
      niches: {
        firstNiche,
        secondNiche,
        thirdNiche,
      },
      coverLetter,
    };

    // user resume
    if (req.files && req.files.resume) {
      const { resume } = req.files;

      if (resume) {
        try {
          //uploading file on the cloudinary
          const cloudinaryResponse = await cloudinary.uploader.upload(
            resume.tempFilePath,
            { folder: "Job_Seekers_Resume" }
          );

          //validating the response of the cloudinary
          if (!cloudinaryResponse || cloudinaryResponse.error) {
            return next(new ErrorHandler("Failed to upload Resume", 500));
          }

          userData.resume = {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
          };
        } catch (error) {
          return next(new ErrorHandler("Failed to Upload Resume", 500));
        }
      }
    }

    //storing data of the user in the database
    const storedData = await User.create(userData);

    sendToken(storedData, 201, res, "User Registered Successfull..");
  } catch (error) {
    console.log("error occured while register");
    next(error);
  }
};

/****************************************
 *               LOGIN                  *
 *****************************************/

export const login = async (req, res, next) => {
  try {
    const { role, email, password } = req.body;

    if (!role || !email || !password) {
      return next(new ErrorHandler("All field requiered..", 400));
    }

    //finding the user
    // const user=await User.findOne({email}).select("+password");
    const user = await User.findOne({ email });
    const userpassword = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorHandler("User doesn't Exist..", 400));
    }

    //validating the user password
    const isPasswordValid = await userpassword.comparePassword(password);

    if (!isPasswordValid) {
      return next(new ErrorHandler("Invalid Credentials", 400));
    }

    //validating user role
    if (user.role !== role) {
      return next(new ErrorHandler("Invalid user role credentials", 400));
    }

    sendToken(user, 200, res, "loged in successfull..");
  } catch (err) {
    console.log(`Error occured while login : ${err}`);
    next(err);
  }
};

/****************************************
 *               Logout                 *
 *****************************************/

export const logout = async (req, res, next) => {
  try {
    res
      .status(200)
      .cookie("token", "", {
        expires: new Date(Date.now()),
        httpOnly: true,
      })
      .json({
        success: true,
        message: "Loged out Successfully..",
      });
  } catch (err) {
    console.log(`Error occured while logout ${err}`);
    next(new ErrorHandler("logout failed", 401));
  }
};

/****************************************
 *               getUSer                *
 *****************************************/

export const getUser = async (req, res, next) => {
  try {
    const user = req.user;
    // console.log(user);
    res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    console.log(`Error occured while getuser ${err}`);
    next(err);
  }
};

/****************************************
 *              profile Update          *
 *****************************************/

export const updateProfile = async (req, res, next) => {
  try {
    
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      coverLetter: req.body.coverLetter,
      niches: {
        firstNiche: req.body.firstNiche,
        secondNiche: req.body.secondNiche,
        thirdNiche: req.body.thirdNiche,
      },
    };

    const { firstNiche, secondNiche, thirdNiche } = newUserData.niches;
    // console.log(req.user.role);

    if (
      req.user.role === "Job Seeker" &&
      (!firstNiche || !secondNiche || !thirdNiche)
    ) {
      return next(new ErrorHandler("All field are required", 400));
    }

    if (req.files) {
      const resume = req.files.resume;

      if (resume) {
        const currentResumeId = req.user.resume.public_id;

        if (currentResumeId) {
          await cloudinary.uploader.destroy(currentResumeId);
        }


        const newResume = await cloudinary.uploader.upload(
          resume.tempFilePath,
          {
            folder: "Job_Seekers_Resume",
          }
        );
        newUserData.resume={
          publid_id:newResume.public_id,
          url:newResume.secure_url
        }
      }
    }


    // updating the user
    const user=await User.findByIdAndUpdate(req.user.id,newUserData,{
      new:true,
      runValidators:true,
      useFindAndModify:false
    });

    res.status(200).json({
      success:true,
      user,
      message:"profile Updated Successfull..."
    })


  } catch (err) {
    console.log(`Error occured while updating profile ${err}`);
    next(err);
  }
};



/****************************************
 *              updating password       *
 ****************************************/

export const updatePassword=async(req,res,next)=>{
  try{
    const user=await User.findById(req.user.id).select("+password");
   

    //fetching the old password form user and compare it
    const isPasswordMatched=await user.comparePassword(req.body.oldPassword);
    
    if(!isPasswordMatched){
      return next(new ErrorHandler("Invalid old password ",400));
    }

    //fetching the new password of the user
    if(req.body.newPassword!== req.body.confirmPassword){
      return next(new ErrorHandler("New and Confirm password do not match",400));
    }

    user.password=req.body.newPassword;
    await user.save();
    sendToken(user,200,res,"Password Updated Successfull");


  }catch(err){
    console.log(`Error occured while updating password :  ${err}`);
    next(err);
  }
}
