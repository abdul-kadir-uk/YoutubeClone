import { createSlice } from '@reduxjs/toolkit';

// Create a slice for authentication state management
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    isLoggedIn: false
  },
  reducers: {
    // Action to handle user login
    login: (state, action) => {
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    // Action to handle user logout
    logout: (state) => {
      state.token = null;
      state.isLoggedIn = false;
      localStorage.removeItem("token");
    }
  }
});

// Export login and logout actions
export const { login, logout } = authSlice.actions;

// Export the auth reducer
export default authSlice.reducer;
