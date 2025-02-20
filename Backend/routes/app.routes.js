import express from 'express';
const router=express.Router();
import {isAuthenticated, isAuthorized} from '../middlewares/auth.middleware.js'
import { employerGetAllApplication, jobSeekerGetAllApplication, postApplication,deleteApplication } from '../controllers/app.controller.js';




router.post('/post/:id',isAuthenticated,isAuthorized("Job Seeker"),postApplication);

router.get('/employer/getall',isAuthenticated,isAuthorized("Employer"),employerGetAllApplication);

router.get('/jobseeker/getall',isAuthenticated,isAuthorized("Job Seeker"),
jobSeekerGetAllApplication);

router.delete('/delete/:id',isAuthenticated,deleteApplication);


export default router;