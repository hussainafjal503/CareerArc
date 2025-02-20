import mongoose from 'mongoose';

export const dbConnection=()=>{
	mongoose.connect(process.env.MONGO_URI)
	.then(()=>{
		console.log(`Connected to database successfull.. :)`)
	})
	.catch((err)=>{
		console.log(`Error occured while connecting to DB : ${err}`);
		process.exit(1);
	});
}