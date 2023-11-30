import { createAsyncThunk } from "@reduxjs/toolkit";
import userApi from "../api";

const planetCreate = createAsyncThunk(
  "planet/create",
  async ({ display_name, callback }, { rejectWithValue }) => {
    try {
      const response = await userApi.post("/planet/create", { display_name });

      if (callback) {
        callback(response.data);
      }

      return response.data;
    } catch (err) {
      throw new Error("Error");
    }
  }
);

const planetSearch = createAsyncThunk(
  "planet/search",
  async (
    { criteria, sortProperty, offset, limit, order, callback },
    { rejectWithValue }
  ) => {
    try {
      const response = await userApi.post("/planet/search", {
        criteria,
        sortProperty,
        offset,
        limit,
        order,
      });

      if (callback) {
        callback(response.data);
      }

      return response.data;
    } catch (err) {
      throw new Error("Error");
    }
  }
);

const planetDelete = createAsyncThunk(
  "planet/delete",
  async ({ planetId, callback }, { rejectWithValue }) => {
    try {
      const response = await userApi.post("/planet/delete", { planetId });

      if (callback) {
        callback(response.data);
      }

      return response.data;
    } catch (err) {
      throw new Error("Error");
    }
  }
);

const planetItem = createAsyncThunk(
  "planet/item",
  async ({ id, callback }, { rejectWithValue }) => {
    try {
      const response = await userApi.post("/planet/item", { id });

      if (callback) {
        callback(response.data);
      }

      return response.data;
    } catch (err) {
      throw new Error("Error");
    }
  }
);

const planetUpdateItem = createAsyncThunk(
  "planet/updateItem",
  async ({ data, callback }, { rejectWithValue }) => {
    try {
      const response = await userApi.post("/planet/updateItem", data);

      if (callback) {
        callback(response.data);
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
    if (
      criteria.hasOwnProperty(key) &&
      key !== "_id" &&
      key !== "display_name"
    ) {
      updateData.$set[`${key}`] = criteria[key];
    }
  }

  return updateData;
}

const planetUpdateManyItems = createAsyncThunk(
  "planet/updateMany",
  async (
    { initialCriteria = {}, newCriteria, callback },
    { rejectWithValue }
  ) => {
    try {
      const updateData = convertCriteriaToUpdateData(newCriteria);

      const response = await userApi.post("/planet/updateMany", {
        criteria: initialCriteria,
        updateData,
      });

      if (callback) {
        callback(response.data);
      }

      return response.data;
    } catch (err) {
      throw new Error("Error");
    }
  }
);

const planetDuplicate = createAsyncThunk(
  "planet/duplicateItem",
  async ({ planetId, callback }, { rejectWithValue }) => {
    try {
      const response = await userApi.post("/planet/duplicateItem", {
        planetId,
      });

      if (callback) {
        callback(response.data);
      }

      return response.data;
    } catch (err) {
      throw new Error("Error");
    }
  }
);

const planetNextItem = createAsyncThunk(
  "planet/nextItem",
  async (
    { id, sortProperty, order, criteria, callback },
    { rejectWithValue }
  ) => {
    try {
      const response = await userApi.post("/planet/nextItem", {
        id,
        sortProperty,
        order,
        criteria,
      });

      if (callback) {
        callback(response.data);
      }

      return response.data;
    } catch (err) {
      throw new Error("Error");
    }
  }
);

const planetPreviousItem = createAsyncThunk(
  "planet/previousItem",
  async (
    { id, sortProperty, order, criteria, callback },
    { rejectWithValue }
  ) => {
    try {
      const response = await userApi.post("/planet/previousItem", {
        id,
        sortProperty,
        order,
        criteria,
      });

      if (callback) {
        callback(response.data);
      }

      return response.data;
    } catch (err) {
      throw new Error("Error");
    }
  }
);

export {
  planetCreate,
  planetSearch,
  planetDelete,
  planetItem,
  planetUpdateItem,
  planetDuplicate,
  planetNextItem,
  planetPreviousItem,
  planetUpdateManyItems,
};
