import { createAsyncThunk } from "@reduxjs/toolkit";
import userApi from "../api";

const signup = createAsyncThunk(
  "user/signup",
  async ({ email, password, callback }, { rejectWithValue }) => {
    try {
      const response = await userApi.post("/auth/signup", {
        email,
        password,
      });
      console.log("signup response", response.data);

      localStorage.setItem('token', response.data.token);

      if (callback) {
        callback(response.data)
      }
      // Return the token for further processing or usage in reducers
      return response.data.token;
    } catch (err) {
      console.log(err);
      throw new Error("Account already exists");
    }
  }
);

const signin = createAsyncThunk(
  "user/signin",
  async ({ email, password }, { rejectWithValue }) => {
    console.log("signing in")
    try {
      const response = await userApi.post("/signin", { email, password });

      // Set the token in AsyncStorage
      localStorage.setItem('token', response.data.token);

      // Return the token for further processing or usage in reducers
      return response.data;
    } catch (err) {
      throw new Error("Email or password is incorrect");
    }
  }
);

const signout = createAsyncThunk(
  "user/signout",
  async (_, { rejectWithValue }) => {
    localStorage.removeItem('token');

    return null;
  }
);

const fetchUserInfo = createAsyncThunk(
  "user/fetchUserInfo",
  async () => {

    const response = await userApi.get(`/auth/user_details`);

    return response.data;
  }
);

export { signin, signout, signup, fetchUserInfo };
