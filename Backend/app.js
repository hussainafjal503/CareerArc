import express from 'express';
import {config} from 'dotenv';
import {dbConnection} from './database/dbConnection.js'
import { errorMiddleware } from './middlewares/error.middlewares.js';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import userRouter from './routes/user.routes.js'
import jobRouter from './routes/job.routes.js'

import applicationRouter from './routes/app.routes.js'
import { newsLetterCron } from './automate/newsLetter.automate.js';

const app=express();
config({path:'./config/config.env'});

//connection of frontend and backend
import cors from 'cors';

app.use(cors({
	origin:process.env.FRONTEND_URL || 'http://localhost:5173',
	methods:["GET","POST","DELETE","PUT"],
	credentials:true,
}));

//jwt cookie parser accessing
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(fileUpload({
	useTempFiles:true,
	tempFileDir:"/temp/",
	})
);


app.use('/api/v1/user',userRouter);
app.use('/api/v1/job',jobRouter);
app.use('/api/v1/application',applicationRouter);

newsLetterCron();

dbConnection();

app.use(errorMiddleware)
export default app;