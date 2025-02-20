import express from 'express';
import { isAuthenticated, isAuthorized } from '../middlewares/auth.middleware.js';
import { deleteJob, getAllJobs, getJobDetails, getMyJobs, postJob } from '../controllers/job.controller.js';
const router=express.Router();



router.post('/postjob',isAuthenticated,isAuthorized("Employer"),postJob);
router.get('/getalljobs',getAllJobs);
router.get('/getmyjobs',isAuthenticated	,isAuthorized("Employer"),getMyJobs);
router.delete("/delete/:id",isAuthenticated,isAuthorized("Employer"),deleteJob);

router.get('/getonejob/:id',getJobDetails);


export default router;