import { createAsyncThunk } from "@reduxjs/toolkit";
import userApi from "../api";


const shapeCreate = createAsyncThunk(
    "shape/create",
      async ({ name, callback }, { rejectWithValue }) => {
      try {
        const response = await userApi.post("/shape/create", { name });
  
        if (callback) {
          callback(response.data)
        }
  
        return response.data;
      } catch (err) {
        throw new Error("Error");
      }
    }
);

const shapeSearch = createAsyncThunk(
    "shape/search",
      async ({ criteria, sortProperty, offset, limit, order, callback }, { rejectWithValue }) => {
      try {
        const response = await userApi.post("/shape/search", { 
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

const shapeDelete = createAsyncThunk(
  "shape/delete",
    async ({ shapeId, callback }, { rejectWithValue }) => {
    try {
      const response = await userApi.post("/shape/delete", { shapeId });

      if (callback) {
        callback(response.data)
      }

      return response.data;
    } catch (err) {
      throw new Error("Error");
    }
  }
);

const shapeItem = createAsyncThunk(
  "shape/item",
    async ({ shapeId, callback }, { rejectWithValue }) => {
    try {
      const response = await userApi.post("/shape/item", { shapeId });

      if (callback) {
        callback(response.data)
      }

      return response.data;
    } catch (err) {
      throw new Error("Error");
    }
  }
);


const shapeUpdateItem = createAsyncThunk(
  "shape/updateItem",
    async ({ data, callback }, { rejectWithValue }) => {
    try {
      const response = await userApi.post("/shape/updateItem", data);

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

const shapeUpdateManyItems = createAsyncThunk(
  "shape/updateMany",
    async ({ initialCriteria, newCriteria, callback }, { rejectWithValue }) => {
    try {
      const updateData = convertCriteriaToUpdateData(newCriteria);

      const response = await userApi.post("/shape/updateMany", {
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

const shapeDuplicate = createAsyncThunk(
  "shape/duplicateItem",
    async ({ shapeId, callback }, { rejectWithValue }) => {
    try {
      const response = await userApi.post("/shape/duplicateItem", {
        shapeId
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


const shapeNextItem = createAsyncThunk(
  "shape/nextItem",
    async ({ id, sortProperty, order, criteria , callback }, { rejectWithValue }) => {
    try {
      const response = await userApi.post("/shape/nextItem", {
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

const shapePreviousItem = createAsyncThunk(
  "shape/previousItem",
    async ({ id, sortProperty, order, criteria , callback }, { rejectWithValue }) => {
    try {
      const response = await userApi.post("/shape/previousItem", {
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
    shapeCreate,
    shapeSearch,
    shapeDelete,
    shapeItem,
    shapeUpdateItem,
    shapeDuplicate,
    shapeNextItem,
    shapePreviousItem,
    shapeUpdateManyItems
};