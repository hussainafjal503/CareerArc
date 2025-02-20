import { catchAsyncErrors } from "../middlewares/catchAsyncError.middleware.js";
import ErrorHandler from "../middlewares/error.middlewares.js";
import { Job } from "../models/jobSchema.models.js";

/****************************************
 *          	PostJob function          *
 ****************************************/

export const postJob = async (req, res, next) => {
  try {
    const {
      title,
      jobType,
      location,
      companyName,
      responsibilities,
      qualifications,
      salary,
      personalWebsiteTitle,
      personalWebsiteUrl,
      jobNiche,
      hiringMultipleCandidates,
      introduction,
      offers,
    } = req.body;

    if (
      !title ||
      !jobType ||
      !location ||
      !companyName ||
      !introduction ||
      !responsibilities ||
      !qualifications ||
      !salary ||
      !jobNiche
    ) {
      return next(new ErrorHandler("Please Provide Job full details", 400));
    }

    //validating the website fields
    if (
      (personalWebsiteTitle && !personalWebsiteUrl) ||
      (!personalWebsiteTitle && personalWebsiteUrl)
    ) {
      return next(
        new ErrorHandler(
          "Please Provide full Website Detail or leave both website field",
          400
        )
      );
    }
    //const
    const postedBy = req.user._id;

    const job = await Job.create({
      title,
      jobType,
      location,
      companyName,
      responsibilities,
      qualifications,
      salary,
      personalWebsite: {
        title: personalWebsiteTitle,
        url: personalWebsiteUrl,
      },
      jobNiche,
      hiringMultipleCandidates,
      introduction,
      offers,
      postedBy,
    });

    res.status(201).json({
      success: true,
      message: "Job posted Successfully..",
      job,
    });
  } catch (err) {
    console.log(`Error occured while postingJob ${err}`);
    next(err);
  }
};

/****************************************
 *   get all job details function       *
 ****************************************/

export const getAllJobs = async (req, res, next) => {
  try {
    const { city, niche, searchKeyword } = req.query;
    const query = {};
    if (city) {
      query.location = city;
    }
    if (niche) {
      query.jobNiche = niche;
    }
    if (searchKeyword) {
      query.$or = [
        { title: { $regex: searchKeyword, $options: "i" } },
        { companyName: { $regex: searchKeyword, $options: "i" } },
        { introduction: { $regex: searchKeyword, $options: "i" } },
      ];
    }

    const jobs = await Job.find(query);

    res.status(200).json({
      success: true,
      jobs,
      count: jobs.length,
    });
  } catch (err) {
    console.log(`Error occured while getting all jobs ${err}`);
    next(err);
  }
};

/****************************************
 *   getmyjob details function       *
 ****************************************/

export const getMyJobs = async (req, res, next) => {
  try {
    const myJobs = await Job.find({ postedBy: req.user._id });

    res.status(200).json({
      success: true,
      myJobs,
    });
  } catch (err) {
    console.log(`Error occured while getting my jobs ${err}`);
    next(err);
  }
};

/****************************************
 *   delete job details function       *
 ****************************************/
export const deleteJob = async (req, res, next) => {
  try {
    const { id } = req.params;
    const job = await Job.findById(id);

    if (!job) {
      return next(new ErrorHandler("Oops..!! Job not Found", 404));
    }

    await Job.deleteOne();
    res.status(200).json({
      success: true,
      message: "Job Deleted...",
    });
  } catch (err) {
    console.log(`Error occured while deleting jobs ${err}`);
    next(err);
  }
};

/****************************************
 *   get single job details             *
 ****************************************/

export const getJobDetails = async(req, res, next) => {
  try {
    const {id}=req.params;
    const job=await Job.findById(id);

    if (!job) {
      return next(new ErrorHandler("Job not Found", 404));
    }

      res.status(200).json({
        success:true,
        job,
      })
  } catch (err) {
    console.log(`Error occured while getting single job ${err}`);
    next(err);
  }
};
