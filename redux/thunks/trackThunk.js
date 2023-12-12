import { createAsyncThunk } from "@reduxjs/toolkit";
import userApi from "../api";


const trackCreate = createAsyncThunk(
    "track/create",
      async ({ name, album, songLink, callback }, { rejectWithValue }) => {
      try {
        const response = await userApi.post("/track/create", { name, album, songLink });
  
        if (callback) {
          callback(response.data)
        }
  
        return response.data;
      } catch (err) {
        throw new Error("Error");
      }
    }
);

const trackSearch = createAsyncThunk(
    "track/search",
      async ({ criteria, sortProperty, offset, limit, order, callback }, { rejectWithValue }) => {
      try {
        const response = await userApi.post("/track/search", { 
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

const trackDelete = createAsyncThunk(
  "track/delete",
    async ({ trackId, callback }, { rejectWithValue }) => {
    try {
      const response = await userApi.post("/track/delete", { trackId });

      if (callback) {
        callback(response.data)
      }

      return response.data;
    } catch (err) {
      throw new Error("Error");
    }
  }
);

const trackItem = createAsyncThunk(
  "track/item",
    async ({ id, callback }, { rejectWithValue }) => {
    try {
      const response = await userApi.post("/track/item", { id });

      if (callback) {
        callback(response.data)
      }

      return response.data;
    } catch (err) {
      throw new Error("Error");
    }
  }
);


const trackUpdateItem = createAsyncThunk(
  "track/updateItem",
    async ({ data, callback }, { rejectWithValue }) => {
    try {
      const response = await userApi.post("/track/updateItem", data);

      if (callback) {
        callback(response.data)
      }

      return response.data;
    } catch (err) {
      throw new Error("Error");
    }
  }
);

const trackUpdateDuration = createAsyncThunk(
  "track/updateDuration",
    async ({ trackId, duration, callback }, { rejectWithValue }) => {
    try {
      const response = await userApi.post("/track/updateDuration", {
        trackId, duration
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

function convertCriteriaToUpdateData(criteria) {
  const updateData = { $set: {} };

  for (const key in criteria) {
    if (criteria.hasOwnProperty(key) && key !== "_id" && key !== "name") {
          updateData.$set[`${key}`] = criteria[key];
      }
  }

  return updateData;
}

const trackUpdateManyItems = createAsyncThunk(
  "track/updateMany",
    async ({ initialCriteria = {}, newCriteria, callback }, { rejectWithValue }) => {
    try {
      const updateData = convertCriteriaToUpdateData(newCriteria);

      const response = await userApi.post("/track/updateMany", {
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

const trackDuplicate = createAsyncThunk(
  "track/duplicateItem",
    async ({ trackId, callback }, { rejectWithValue }) => {
    try {
      const response = await userApi.post("/track/duplicateItem", {
        trackId
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


const trackNextItem = createAsyncThunk(
  "track/nextItem",
    async ({ id, sortProperty, order, criteria , callback }, { rejectWithValue }) => {
    try {
      const response = await userApi.post("/track/nextItem", {
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

const trackPreviousItem = createAsyncThunk(
  "track/previousItem",
    async ({ id, sortProperty, order, criteria , callback }, { rejectWithValue }) => {
    try {
      const response = await userApi.post("/track/previousItem", {
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
    trackCreate,
    trackSearch,
    trackDelete,
    trackItem,
    trackUpdateItem,
    trackDuplicate,
    trackNextItem,
    trackPreviousItem,
    trackUpdateManyItems,
    trackUpdateDuration
};