import { createAsyncThunk } from "@reduxjs/toolkit";
import userApi from "../api";


const generatorCreate = createAsyncThunk(
    "generator/create",
      async ({ name, callback }, { rejectWithValue }) => {
      try {
        const response = await userApi.post("/generator/create", { name });
  
        if (callback) {
          callback(response.data)
        }
  
        return response.data;
      } catch (err) {
        throw new Error("Error");
      }
    }
);

const generatorSearch = createAsyncThunk(
    "generator/search",
      async ({ criteria, sortProperty, offset, limit, order, callback }, { rejectWithValue }) => {
      try {
        const response = await userApi.post("/generator/search", { 
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

const generatorDelete = createAsyncThunk(
  "generator/delete",
    async ({ generatorId, callback }, { rejectWithValue }) => {
    try {
      const response = await userApi.post("/generator/delete", { generatorId });

      if (callback) {
        callback(response.data)
      }

      return response.data;
    } catch (err) {
      throw new Error("Error");
    }
  }
);

const generatorItem = createAsyncThunk(
  "generator/item",
    async ({ id, callback }, { rejectWithValue }) => {
    try {
      const response = await userApi.post("/generator/item", { id });

      if (callback) {
        callback(response.data)
      }

      return response.data;
    } catch (err) {
      throw new Error("Error");
    }
  }
);


const generatorUpdateItem = createAsyncThunk(
  "generator/updateItem",
    async ({ data, callback }, { rejectWithValue }) => {
    try {
      const response = await userApi.post("/generator/updateItem", data);

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

const generatorUpdateManyItems = createAsyncThunk(
  "generator/updateMany",
    async ({ initialCriteria = {}, newCriteria, callback }, { rejectWithValue }) => {
    try {
      const updateData = convertCriteriaToUpdateData(newCriteria);

      const response = await userApi.post("/generator/updateMany", {
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

const generatorDuplicate = createAsyncThunk(
  "generator/duplicateItem",
    async ({ generatorId, callback }, { rejectWithValue }) => {
    try {
      const response = await userApi.post("/generator/duplicateItem", {
        generatorId
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


const generatorNextItem = createAsyncThunk(
  "generator/nextItem",
    async ({ id, sortProperty, order, criteria , callback }, { rejectWithValue }) => {
    try {
      const response = await userApi.post("/generator/nextItem", {
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

const generatorPreviousItem = createAsyncThunk(
  "generator/previousItem",
    async ({ id, sortProperty, order, criteria , callback }, { rejectWithValue }) => {
    try {
      const response = await userApi.post("/generator/previousItem", {
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
    generatorCreate,
    generatorSearch,
    generatorDelete,
    generatorItem,
    generatorUpdateItem,
    generatorDuplicate,
    generatorNextItem,
    generatorPreviousItem,
    generatorUpdateManyItems
};