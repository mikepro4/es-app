import { createSlice } from "@reduxjs/toolkit";
import {
  signup,
  signin,
  signout,
  fetchUserInfo
} from "../thunks/userThunk";


const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: null,
    token: null,
    isLoading: false,
    errorMessage: "",
  },
  reducers: {
    clearErrorMessage: (state) => {
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder

      // Signin cases
      .addCase(signin.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = "";
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.userInfo = action.payload.userInfo;
      })
      .addCase(signin.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.error.message;
      })

      
       // Signup cases
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = "";
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.error.message;
      })


      // Fetch User Info cases
      .addCase(fetchUserInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userInfo = action.payload;
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.error.message;
      })


      // Signout cases
      .addCase(signout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signout.fulfilled, (state) => {
        state.isLoading = false;
        state.token = null;
      })
      .addCase(signout.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.error.message;
      })

  },
});

export const { clearErrorMessage } = userSlice.actions;
export const userReducer = userSlice.reducer;
