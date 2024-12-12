import { createSlice } from "@reduxjs/toolkit";
//  create a similar video slice 
const similarVideosSlice = createSlice({
  name: "similarVideos",
  initialState: {
    category: "",
  },
  reducers: {
    // handle set category 
    setCategory(state, action) {
      state.category = action.payload;
    },
  },
});
//  export setcategory action 
export const { setCategory } = similarVideosSlice.actions;

// export similar videos reducer
export default similarVideosSlice.reducer;
