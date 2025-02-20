import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios';



const applicationSlice=createSlice({
	name:"application",
	initialState:{
		application:[],
		loading:false,
		error:null,
		message:null,
		myApplication:[],
	},
	reducers:{
		requrestForAllApplications(state,action){
			state.loading=true;
			state.error=null;
		},
		successForAllApplications(state,action){
			state.loading=false;
			state.error=null;
			state.application=action.payload;
		},
		FailureForAllApplications(state,action){
			state.loading=false;
			state.error=action.payload;
		},

		requrestForMyApplications(state,action){
			state.loading=true;
			state.error=null;
		},
		successForMyApplications(state,action){
			state.loading=false;
			state.error=null;
			state.application=action.payload;
		},
		FailureForMyApplications(state,action){
			state.loading=false;
			state.error=action.payload;
		},

		requestForPostApplication(state,action){
			state.loading=true;
			state.error=null;
			state.message=null;
		},
		successForPostApplication(state,action){
			state.loading=false;
			state.error=null;
			state.message=action.payload;
		},
		failureForPostApplication(state,action){
			state.loading=false;
			state.error=action.payload;
			state.message=null;
		},
		requestForDeleteApplication(state,action){
			state.loading=true;
			state.error=null;
			state.message=null;

		},
		successForDeleteApplication(state,action){
			state.loading=false;
			state.error=null;
			state.message=action.payload;
		},
		FailureForDeleteApplication(state,action){
			state.loading=false;
			state.error=action.payload;
			state.message=null;
		},
		clearAllApplicationError(state,action){
			state.error=null;
			state.application=state.application;
			state.myApplication=state.myApplication;
		},
		resetApplicationSlice(state,action){
			state.error=null;
			state.application=state.application;
			state.myApplication=state.myApplication;
			state.message=null;
			state.loading=false;
		}
	}
})



export const postApplication=(data,jobId)=>async(dispatch)=>{
	dispatch(applicationSlice.actions.requestForPostApplication());
	try{
		const response=await axios.post(`http://localhost:4000/api/v1/application/post/${jobId}`,data,{
			withCredentials:true,
			headers:{
				"Content-Type":"multipart/form-data"
			}
		});
		

		dispatch(applicationSlice.actions.successForPostApplication(response.data.message));
		dispatch(applicationSlice.actions.clearAllApplicationError());

	}catch(error){
		dispatch(applicationSlice.actions.failureForPostApplication(error.response.data.message));

	}

};



export const jobSeekerApplication=()=>async(dispatch)=>{
	dispatch(applicationSlice.actions.requrestForAllApplications());
	try{
		const response=await axios.get(`http://localhost:4000/api/v1/application/jobseeker/getall`,{
			withCredentials:true,
		});
		

		dispatch(applicationSlice.actions.successForAllApplications(response.data.application));
		dispatch(applicationSlice.actions.clearAllApplicationError());

	}catch(error){
		dispatch(applicationSlice.actions.FailureForAllApplications(error.response.data.message));

	}
}




export const fetchEmployerApplication=()=>async(dispatch)=>{
	dispatch(applicationSlice.actions.requrestForMyApplications());
	try{
		const response=await axios.get(`http://localhost:4000/api/v1/application/employer/getall`,{
			withCredentials:true,
		});
		

		dispatch(applicationSlice.actions.successForMyApplications(response.data.application));
		dispatch(applicationSlice.actions.clearAllApplicationError());

	}catch(error){
		dispatch(applicationSlice.actions.FailureForMyApplications(error.response.data.message));

	}
}

export const deleteApplication=(id)=>async(dispatch)=>{
	dispatch(applicationSlice.actions.requestForDeleteApplication());
	try{
		const response=await axios.delete(`http://localhost:4000/api/v1/application/delete/${id}`,{
			withCredentials:true,
		});
		dispatch(applicationSlice.actions.successForDeleteApplication(response.data.message));
		dispatch(applicationSlice.actions.clearAllApplicationError());
	}catch(error){
		dispatch(applicationSlice.actions.clearAllApplicationError(response.data.message))
	}

	

}
export const clearAllApplicationError = () => (dispatch) => {
	dispatch(applicationSlice.actions.clearAllApplicationError());
  };
  
  
  
  
  export const resetApplication = () => (dispatch) => {
	dispatch(jobSlice.actions.resetApplicationSlice());
  };


  export default applicationSlice.reducer