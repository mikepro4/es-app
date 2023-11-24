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

const testDelete = createAsyncThunk(
  "test/delete",
    async ({ testId, callback }, { rejectWithValue }) => {
    try {
      const response = await userApi.post("/test/delete", { testId });

      if (callback) {
        callback(response.data)
      }

      return response.data;
    } catch (err) {
      throw new Error("Error");
    }
  }
);

const testItem = createAsyncThunk(
  "test/item",
    async ({ testId, callback }, { rejectWithValue }) => {
    try {
      const response = await userApi.post("/test/item", { testId });

      if (callback) {
        callback(response.data)
      }

      return response.data;
    } catch (err) {
      throw new Error("Error");
    }
  }
);


const testUpdateItem = createAsyncThunk(
  "test/updateItem",
    async ({ data, callback }, { rejectWithValue }) => {
    try {
      const response = await userApi.post("/test/updateItem", data);

      if (callback) {
        callback(response.data)
      }

      return response.data;
    } catch (err) {
      throw new Error("Error");
    }
  }
);

const testDuplicate = createAsyncThunk(
  "test/duplicateItem",
    async ({ testId, callback }, { rejectWithValue }) => {
    try {
      const response = await userApi.post("/test/duplicateItem", {
        testId
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
    testSearch,
    testDelete,
    testItem,
    testUpdateItem,
    testDuplicate
};