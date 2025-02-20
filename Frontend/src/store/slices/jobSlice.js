import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { act } from "react";

const jobSlice = createSlice({
  name: "jobs",
  initialState: {
    jobs: [],
    loading: false,
    error: null,
    message: null,
    singleJob: {},
    myJobs: [],
  },
  reducers: {
    requestForAllJobs(state, action) {
      state.loading = true;
      state.error = null;
    },
    successForAllJobs(state, action) {
      state.loading = false;
      state.jobs = action.payload;
      state.error = null;
    },
    failureForAllJobs(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    requestForSingleJob(state, action) {
      state.message = null;
      state.error = null;
      state.loading = true;
    },
    successForSingleJob(state, action) {
      state.error = null;
      state.loading = false;
      state.singleJob = action.payload;
    },
    failureForSingleJob(state, action) {
      state.error = action.payload;
      state.loading = false;
      state.singleJob = state.singleJob;
    },
    requestForPostJob(state, action) {
      state.message = null;
      state.error = null;
      state.loading = true;
    },

    successForPostJob(state, action) {
      state.message = action.payload;
      state.error = null;
      state.loading = false;
    },
    FailureForPostJob(state, action) {
      state.message = null;
      state.error = action.payload;
      state.loading = false;
    },

    requestForMyJob(state, action) {
      state.loading = true;
      state.error = null;
      state.myJobs = [];
    },
    successForMyJob(state, action) {
      state.loading = false;
      state.error = null;
      state.myJobs = action.payload;
    },
    failureForMyJob(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.myJobs = [];
    },

    requestForDeleteJob(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    successForDeleteJob(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    failureForDeleteJob(state, action) {
      state.loading = true;
      state.error = action.payload;
      state.message = null;
    },

    clearAllErrors(state, action) {
      state.error = null;
      state.jobs = state.jobs;
    },
    resetJobSlice(state, action) {
      state.error = null;
      state.jobs = state.jobs;
      state.loading = false;
      state.message = null;
      state.myJobs = state.myJobs;
      state.singleJob = {};
    },
  },
});

/********************   fucntions   ***************/
export const fetchJobs =
  (city, niche, serachKeyword = "") =>
  async (dispatch) => {
    try {
      dispatch(jobSlice.actions.requestForAllJobs());
      let link = "http://localhost:4000/api/v1/job/getalljobs?";
      let queryParams = [];
      if (serachKeyword) {
        queryParams.push(`searchKeywords=${serachKeyword}`);
      }
      if (city) {
        queryParams.push(`city=${city}`);
      }
      if (niche) {
        queryParams.push(`niche=${niche}`);
      }

      link += queryParams.join("&");
      const response = await axios.get(link, { withCredentials: true });
      dispatch(jobSlice.actions.successForAllJobs(response.data.jobs));
      dispatch(jobSlice.clearAllErrors());
    } catch (error) {
      dispatch(jobSlice.actions.failureForAllJobs(error.response.data.message));
    }
  };

export const fetchSingleJob = (jobId) => async (dispatch) => {
  try {
    dispatch(jobSlice.actions.requestForSingleJob);
    const response = await axios.get(
      `http://localhost:4000/api/v1/job/getonejob/${jobId}`,
      {
        withCredentials: true,
      }
    );

    dispatch(jobSlice.actions.successForSingleJob(response.data.job));
    dispatch(jobSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(jobSlice.actions.failureForSingleJob(error.response.data.message));
  }
};

export const postNewJob = (data) => async (dispatch) => {
  dispatch(jobSlice.actions.requestForPostJob());
  try {
    const response = await axios.post(
      "http://localhost:4000/api/v1/job/postjob",
      data,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch(jobSlice.actions.successForPostJob(response.data.message));
    dispatch(jobSlice.actions.clearAllErrors());
  } catch (err) {
    dispatch(jobSlice.actions.FailureForPostJob(err.response.data.message));
  }
};

export const getMyJobs = () => async (dispatch) => {
  dispatch(jobSlice.actions.requestForMyJob());
  try {
    const response = await axios.get(
      "http://localhost:4000/api/v1/job/getmyjobs",
      data,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch(jobSlice.actions.successForMyJob(response.data.myJob));
    dispatch(jobSlice.actions.failureForMyJob());
  } catch (err) {
    dispatch(jobSlice.actions.failureForMyJob(err.response));
  }
};

export const deleteJob = (id) => async (dispatch) => {
  dispatch(applicationSlice.actions.requestForDeleteJob());
  try {
    const response = await axios.delete(
      `http://localhost:4000/api/v1/job/delete/${id}`,
      {
        withCredentials: true,
      }
    );
    dispatch(
      applicationSlice.actions.successForDeleteJob(
        response.data.message
      )
    );
    dispatch(applicationSlice.actions.clearAllJobErrors());
  } catch (error) {
    dispatch(
      applicationSlice.actions.failureForDeleteJob(response.data.message)
    );
  }
};

export const clearAllJobErrors = () => (dispatch) => {
  dispatch(jobSlice.actions.clearAllErrors());
};

export const resetJobSlice = () => (dispatch) => {
  dispatch(jobSlice.actions.resetJobSlice());
};

export default jobSlice.reducer;
