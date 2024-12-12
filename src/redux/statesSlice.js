
import { createSlice } from "@reduxjs/toolkit";
// create a slice for Ids
const StatesSlice = createSlice({
  name: "IdStates",
  initialState: {
    userId: "",
    channelId: "",
    videoId: "",
  },
  reducers: {
    // action to handle set user id 
    setUserID(state, action) {
      state.userId = action.payload;
    },
    // action to handle set channel id 
    setChannelID(state, action) {
      state.channelId = action.payload;
    },
    // action to handle set video id 
    setVideoID(state, action) {
      state.videoId = action.payload;
    },
  },
});
//  export setuserid , setchannelid, setvideoid, setRefresh actions 
export const { setChannelID, setUserID, setVideoID } = StatesSlice.actions;
// export idstates reducer 
export default StatesSlice.reducer;
