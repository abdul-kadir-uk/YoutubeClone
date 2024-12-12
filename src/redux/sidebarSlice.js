import { createSlice } from "@reduxjs/toolkit";
// create a sidbar slice 
const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState: {
    isOpen: false
  },
  reducers: {
    // toggle sidebar 
    toggleSidebar: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});
// export toggleSidebar action
export const { toggleSidebar } = sidebarSlice.actions;
// export sidebar reducer 
export default sidebarSlice.reducer;