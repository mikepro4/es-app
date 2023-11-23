import { createAsyncThunk } from "@reduxjs/toolkit";
import userApi from "../api";


const testCreate = createAsyncThunk(
    "test/create",
      async ({ name, callback }, { rejectWithValue }) => {
      try {
        const response = await userApi.post("/test/create", { name });
  
        if (callback) {
          callback(response.data)
        }
  
        return response.data;
      } catch (err) {
        throw new Error("Error");
      }
    }
);

const testSearch = createAsyncThunk(
    "test/search",
      async ({ criteria, sortProperty, offset, limit, order, callback }, { rejectWithValue }) => {
      try {
        const response = await userApi.post("/test/search", { 
            criteria, sortProperty, offset, limit, order 
        });
  
        if (callback) {
          callback(response.data)
        }
  
        return response.data;
      } catch (err) {
        throw new Error("Error");
      }
    }
);

export { 
    testCreate,
    testSearch
};