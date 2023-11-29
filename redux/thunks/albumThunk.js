import { createAsyncThunk } from "@reduxjs/toolkit";
import userApi from "../api";


const albumCreate = createAsyncThunk(
    "album/create",
      async ({ name, callback }, { rejectWithValue }) => {
      try {
        const response = await userApi.post("/album/create", { name });
  
        if (callback) {
          callback(response.data)
        }
  
        return response.data;
      } catch (err) {
        throw new Error("Error");
      }
    }
);

const albumSearch = createAsyncThunk(
    "album/search",
      async ({ criteria, sortProperty, offset, limit, order, callback }, { rejectWithValue }) => {
      try {
        const response = await userApi.post("/album/search", { 
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

const albumDelete = createAsyncThunk(
  "album/delete",
    async ({ albumId, callback }, { rejectWithValue }) => {
    try {
      const response = await userApi.post("/album/delete", { albumId });

      if (callback) {
        callback(response.data)
      }

      return response.data;
    } catch (err) {
      throw new Error("Error");
    }
  }
);

const albumItem = createAsyncThunk(
  "album/item",
    async ({ id, callback }, { rejectWithValue }) => {
    try {
      const response = await userApi.post("/album/item", { id });

      if (callback) {
        callback(response.data)
      }

      return response.data;
    } catch (err) {
      throw new Error("Error");
    }
  }
);


const albumUpdateItem = createAsyncThunk(
  "album/updateItem",
    async ({ data, callback }, { rejectWithValue }) => {
    try {
      const response = await userApi.post("/album/updateItem", data);

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

const albumUpdateManyItems = createAsyncThunk(
  "album/updateMany",
    async ({ initialCriteria = {}, newCriteria, callback }, { rejectWithValue }) => {
    try {
      const updateData = convertCriteriaToUpdateData(newCriteria);

      const response = await userApi.post("/album/updateMany", {
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

const albumDuplicate = createAsyncThunk(
  "album/duplicateItem",
    async ({ albumId, callback }, { rejectWithValue }) => {
    try {
      const response = await userApi.post("/album/duplicateItem", {
        albumId
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


const albumNextItem = createAsyncThunk(
  "album/nextItem",
    async ({ id, sortProperty, order, criteria , callback }, { rejectWithValue }) => {
    try {
      const response = await userApi.post("/album/nextItem", {
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

const albumPreviousItem = createAsyncThunk(
  "album/previousItem",
    async ({ id, sortProperty, order, criteria , callback }, { rejectWithValue }) => {
    try {
      const response = await userApi.post("/album/previousItem", {
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
    albumCreate,
    albumSearch,
    albumDelete,
    albumItem,
    albumUpdateItem,
    albumDuplicate,
    albumNextItem,
    albumPreviousItem,
    albumUpdateManyItems
};