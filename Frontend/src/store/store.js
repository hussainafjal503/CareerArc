import { configureStore } from "@reduxjs/toolkit";
import jobReducer from "./slices/jobSlice";
import userReducer from "./slices/userSlice";
import applicationReducer from "./slices/applicationSlice";
import updateProfileReducer, { updateProfile } from './slices/updateProfileSlice';

const store = configureStore({
  reducer: {
    jobs: jobReducer,
    user: userReducer,
    application: applicationReducer,
    updateProfile:updateProfileReducer
  },
});

export default store;
