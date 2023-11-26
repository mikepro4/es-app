import { createAsyncThunk } from "@reduxjs/toolkit";
import userApi from "../api";


const algoCreate = createAsyncThunk(
    "algo/create",
      async ({ name, callback }, { rejectWithValue }) => {
      try {
        const response = await userApi.post("/algo/create", { name });
  
        if (callback) {
          callback(response.data)
        }
  
        return response.data;
      } catch (err) {
        throw new Error("Error");
      }
    }
);

const algoSearch = createAsyncThunk(
    "algo/search",
      async ({ criteria, sortProperty, offset, limit, order, callback }, { rejectWithValue }) => {
      try {
        const response = await userApi.post("/algo/search", { 
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

const algoDelete = createAsyncThunk(
  "algo/delete",
    async ({ algoId, callback }, { rejectWithValue }) => {
    try {
      const response = await userApi.post("/algo/delete", { algoId });

      if (callback) {
        callback(response.data)
      }

      return response.data;
    } catch (err) {
      throw new Error("Error");
    }
  }
);

const algoItem = createAsyncThunk(
  "algo/item",
    async ({ id, callback }, { rejectWithValue }) => {
    try {
      const response = await userApi.post("/algo/item", { id });

      if (callback) {
        callback(response.data)
      }

      return response.data;
    } catch (err) {
      throw new Error("Error");
    }
  }
);


const algoUpdateItem = createAsyncThunk(
  "algo/updateItem",
    async ({ data, callback }, { rejectWithValue }) => {
    try {
      const response = await userApi.post("/algo/updateItem", data);

      if (callback) {
        callback(response.data)
      }

      return response.data;
    } catch (err) {
      throw new Error("Error");
    }
  }
);

function convertCriteriaToUpdateData(criteria) {
  const updateData = { $set: {} };

  for (const key in criteria) {
    if (criteria.hasOwnProperty(key) && key !== "_id" && key !== "name") {
          updateData.$set[`${key}`] = criteria[key];
      }
  }

  return updateData;
}

const algoUpdateManyItems = createAsyncThunk(
  "algo/updateMany",
    async ({ initialCriteria, newCriteria, callback }, { rejectWithValue }) => {
    try {
      const updateData = convertCriteriaToUpdateData(newCriteria);

      const response = await userApi.post("/algo/updateMany", {
        criteria: initialCriteria,
        updateData
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

const algoDuplicate = createAsyncThunk(
  "algo/duplicateItem",
    async ({ algoId, callback }, { rejectWithValue }) => {
    try {
      const response = await userApi.post("/algo/duplicateItem", {
        algoId
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


const algoNextItem = createAsyncThunk(
  "algo/nextItem",
    async ({ id, sortProperty, order, criteria , callback }, { rejectWithValue }) => {
    try {
      const response = await userApi.post("/algo/nextItem", {
        id, sortProperty, order, criteria 
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

const algoPreviousItem = createAsyncThunk(
  "algo/previousItem",
    async ({ id, sortProperty, order, criteria , callback }, { rejectWithValue }) => {
    try {
      const response = await userApi.post("/algo/previousItem", {
        id, sortProperty, order, criteria 
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
    algoCreate,
    algoSearch,
    algoDelete,
    algoItem,
    algoUpdateItem,
    algoDuplicate,
    algoNextItem,
    algoPreviousItem,
    algoUpdateManyItems
};