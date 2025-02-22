import ErrorHandler from "../middlewares/error.middlewares.js";
import { Application } from "../models/appSchema.models.js";
import { Job } from "../models/jobSchema.models.js";
import { v2 as cloudinary } from "cloudinary";

/********************************************
 *          Post Application                *
 ********************************************/
export const postApplication = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, phone, address, coverLetter } = req.body;

    if (!name || !email || !phone || !address || !coverLetter) {
      return next(new ErrorHandler("All fields are Required ..", 400));
    }

    //job seeker info
    const jobSeekerInfo = {
      id: req.user._id,
      name,
      email,
      phone,
      address,
      coverLetter,
      role: "Job Seeker",
    };

    //finding job details using jobs id
    const jobDetails = await Job.findById(id);

    if (!jobDetails) {
      return next(new ErrorHandler("Job not found ", 404));
    }

    //user already for the job or not
    const isAlreadyApplied = await Application.findOne({
      "jobInfo.jobId": id,
      "jobSeekerInfo.id": req.user._id,
    });
    if (isAlreadyApplied) {
      return next(
        new ErrorHandler("You have Already Applied for this Job", 400)
      );
    }

    //resume uploading while post application
    if (req.files && req.files.resume) {
      const { resume } = req.files;
      try {
        const cloudinaryResponse = await cloudinary.uploader.upload(
          resume.tempFilePath,
          {
            folder: "Job_Seeker_Resume",
          }
        );

        if (!cloudinaryResponse || cloudinaryResponse.error) {
          return next(
            new ErrorHandler("Failed to upload resume to cloudinary", 500)
          );
        }

        jobSeekerInfo.resume = {
          publid_id: cloudinaryResponse.public_id,
          url: cloudinaryResponse.secure_url,
        };
      } catch (err) {
        console.log(`error occured while uploading file `);
        return next(new ErrorHandler("failed to upload resume", 500));
      }
    }
    //  else {
    //   if (req.user && !req.user.resume.url) {
    //     return next(new ErrorHandler("Please upload your Resume..", 400));
    //   }
    //   jobSeekerInfo.resume = {
    //     public_id: req.user && req.user.resume.publid_id,
    //     url: req.user && req.user.resume.url,
    //   };
    // }

    //employer info///
    const employerInfo = {
      id: jobDetails.postedBy,
      role: "Employer",
    };

    //job info
    const jobInfo = {
      jobId: id,
      jobTitle: jobDetails.title,
    };

    //saving the details in database

    const application = await Application.create({
      jobSeekerInfo,
      employerInfo,
      jobInfo,
    });

    //sending the response
    res.status(201).json({
      success: true,
      message: "Application Submited ",
    });
  } catch (err) {
    console.log(`Error occured while getting single job ${err}`);
    next(err);
  }
};

/******************************************************
 *          employerGetAll Application                *
 ******************************************************/
export const employerGetAllApplication = async (req, res, next) => {
  try {
    const { _id } = req.user;

    const applications = await Application.find({
      "employerInfo.id": _id,
      "deletedBy.employer":false,
    });

    res.status(200).json({
      success:true,
      applications,
      message:"All applicatiion fetch.."
    })
  } catch (err) {
    console.log(`Error occured while getting all employer application :  ${err}`);
    next(err);
  }
};



/******************************************************
 *          Sekker all Application                *
 ******************************************************/
export const jobSeekerGetAllApplication = async (req, res, next) => {
  try {
    const { _id } = req.user;

    const applications = await Application.find({
      "jobSeekerInfo.id": _id,
      // "deletedBy.jobSeeker":false,
    });

    res.status(200).json({
      success:true,
      applications,
      message:"All applicatiion fetch.."
    })
  } catch (err) {
    console.log(`Error occured while getting job Seeker application :  ${err}`);
    next(err);
  }
};


/******************************************************
 *         deleting application from both side               *
 ******************************************************/
export const deleteApplication = async (req, res, next) => {
  try {

    const {id}=req.params;
    const application =await Application.findById(id);
    if(!application){
      return next(new ErrorHandler("Application not found",404));
    }

    const {role}=req.user;
    switch(role){
      case "Job Seeker":{
        application.deletedBy.jobSeeker=true;
        await application.save();
        break;
      }
      case "Employer":{
        application.deletedBy.employer=true;
        await application.save();
        break;
      }
      default:
        console.log(`Application default function `)
        break;

    }

    if(application.deletedBy.employer===true && 
      application.deletedBy.jobSeeker===true){

      await application.deleteOne();


    }

    res.status(200).json({
      success:true,
      message:"Application Deleted...."
    })

  } catch (err) {
    console.log(`Error occured while deleting the application ${err}`);
    next(err);
  }
};
