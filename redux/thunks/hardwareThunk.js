import { createAsyncThunk } from "@reduxjs/toolkit";
import userApi from "../api";


const hardwareCreate = createAsyncThunk(
    "hardware/create",
      async ({ name, callback }, { rejectWithValue }) => {
      try {
        const response = await userApi.post("/hardware/create", { name });
  
        if (callback) {
          callback(response.data)
        }
  
        return response.data;
      } catch (err) {
        throw new Error("Error");
      }
    }
);

const hardwareSearch = createAsyncThunk(
    "hardware/search",
      async ({ criteria, sortProperty, offset, limit, order, callback }, { rejectWithValue }) => {
      try {
        const response = await userApi.post("/hardware/search", { 
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

const hardwareDelete = createAsyncThunk(
  "hardware/delete",
    async ({ hardwareId, callback }, { rejectWithValue }) => {
    try {
      const response = await userApi.post("/hardware/delete", { hardwareId });

      if (callback) {
        callback(response.data)
      }

      return response.data;
    } catch (err) {
      throw new Error("Error");
    }
  }
);

const hardwareCalculatePercentage = createAsyncThunk(
  "hardware/calculatePercentage",
    async ({ hardwareId, callback }, { rejectWithValue }) => {
    try {
      const response = await userApi.post("/hardware/calculatePercentage", { hardwareId });

      if (callback) {
        callback(response.data)
      }

      return response.data;
    } catch (err) {
      throw new Error("Error");
    }
  }
);



const hardwareItem = createAsyncThunk(
  "hardware/item",
    async ({ id, callback }, { rejectWithValue }) => {
    try {
      const response = await userApi.post("/hardware/item", { id });

      if (callback) {
        callback(response.data)
      }

      return response.data;
    } catch (err) {
      throw new Error("Error");
    }
  }
);


const hardwareUpdateItem = createAsyncThunk(
  "hardware/updateItem",
    async ({ data, callback }, { rejectWithValue }) => {
    try {
      const response = await userApi.post("/hardware/updateItem", data);

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

const hardwareUpdateManyItems = createAsyncThunk(
  "hardware/updateMany",
    async ({ initialCriteria = {}, newCriteria, callback }, { rejectWithValue }) => {
    try {
      const updateData = convertCriteriaToUpdateData(newCriteria);

      const response = await userApi.post("/hardware/updateMany", {
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

const hardwareDuplicate = createAsyncThunk(
  "hardware/duplicateItem",
    async ({ hardwareId, callback }, { rejectWithValue }) => {
    try {
      const response = await userApi.post("/hardware/duplicateItem", {
        hardwareId
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


const hardwareNextItem = createAsyncThunk(
  "hardware/nextItem",
    async ({ id, sortProperty, order, criteria , callback }, { rejectWithValue }) => {
    try {
      const response = await userApi.post("/hardware/nextItem", {
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

const hardwarePreviousItem = createAsyncThunk(
  "hardware/previousItem",
    async ({ id, sortProperty, order, criteria , callback }, { rejectWithValue }) => {
    try {
      const response = await userApi.post("/hardware/previousItem", {
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
    hardwareCreate,
    hardwareSearch,
    hardwareDelete,
    hardwareItem,
    hardwareUpdateItem,
    hardwareDuplicate,
    hardwareNextItem,
    hardwarePreviousItem,
    hardwareUpdateManyItems,
    hardwareCalculatePercentage
};