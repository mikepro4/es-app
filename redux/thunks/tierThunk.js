import { createAsyncThunk } from "@reduxjs/toolkit";
import userApi from "../api";


const tierCreate = createAsyncThunk(
    "tier/create",
      async ({ name, callback }, { rejectWithValue }) => {
      try {
        const response = await userApi.post("/tier/create", { name });
  
        if (callback) {
          callback(response.data)
        }
  
        return response.data;
      } catch (err) {
        throw new Error("Error");
      }
    }
);

const tierSearch = createAsyncThunk(
    "tier/search",
      async ({ criteria, sortProperty, offset, limit, order, callback }, { rejectWithValue }) => {
      try {
        const response = await userApi.post("/tier/search", { 
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

const tierDelete = createAsyncThunk(
  "tier/delete",
    async ({ tierId, callback }, { rejectWithValue }) => {
    try {
      const response = await userApi.post("/tier/delete", { tierId });

      if (callback) {
        callback(response.data)
      }

      return response.data;
    } catch (err) {
      throw new Error("Error");
    }
  }
);

const tierItem = createAsyncThunk(
  "tier/item",
    async ({ id, callback }, { rejectWithValue }) => {
    try {
      const response = await userApi.post("/tier/item", { id });

      if (callback) {
        callback(response.data)
      }

      return response.data;
    } catch (err) {
      throw new Error("Error");
    }
  }
);


const tierUpdateItem = createAsyncThunk(
  "tier/updateItem",
    async ({ data, callback }, { rejectWithValue }) => {
    try {
      const response = await userApi.post("/tier/updateItem", data);

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

const tierUpdateManyItems = createAsyncThunk(
  "tier/updateMany",
    async ({ initialCriteria = {}, newCriteria, callback }, { rejectWithValue }) => {
    try {
      const updateData = convertCriteriaToUpdateData(newCriteria);

      const response = await userApi.post("/tier/updateMany", {
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

const tierDuplicate = createAsyncThunk(
  "tier/duplicateItem",
    async ({ tierId, callback }, { rejectWithValue }) => {
    try {
      const response = await userApi.post("/tier/duplicateItem", {
        tierId
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


const tierNextItem = createAsyncThunk(
  "tier/nextItem",
    async ({ id, sortProperty, order, criteria , callback }, { rejectWithValue }) => {
    try {
      const response = await userApi.post("/tier/nextItem", {
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

const tierPreviousItem = createAsyncThunk(
  "tier/previousItem",
    async ({ id, sortProperty, order, criteria , callback }, { rejectWithValue }) => {
    try {
      const response = await userApi.post("/tier/previousItem", {
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
    tierCreate,
    tierSearch,
    tierDelete,
    tierItem,
    tierUpdateItem,
    tierDuplicate,
    tierNextItem,
    tierPreviousItem,
    tierUpdateManyItems
};