import { createAsyncThunk } from "@reduxjs/toolkit";
import userApi from "../api";


const testCreate = createAsyncThunk(
    "test/create",
      async ({ name, callback }, { rejectWithValue }) => {
      console.log("signing in")
      try {
        const response = await userApi.post("/test/create", { name });
  
        if (callback) {
          callback(response.data)
        }
  
        // Return the token for further processing or usage in reducers
        return response.data;
      } catch (err) {
        throw new Error("Email or password is incorrect");
      }
    }
  );

export { 
    testCreate
};