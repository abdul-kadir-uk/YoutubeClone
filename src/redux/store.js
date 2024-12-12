import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from './sidebarSlice';
import authReducer from './authSlice';
import similarVideosReducer from './similarVideosSlice';
import StatesReducer from './statesSlice';

// Configure the Redux store with all the slices
const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    auth: authReducer,
    similarVideos: similarVideosReducer,
    IdStates: StatesReducer
  },
});

// Export the configured store
export default store;
