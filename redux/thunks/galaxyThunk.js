import { createAsyncThunk } from "@reduxjs/toolkit";
import userApi from "../api";

const galaxyCreate = createAsyncThunk(
  "galaxy/create",
  async ({ ngc, callback }, { rejectWithValue }) => {
    try {
      const response = await userApi.post("/galaxy/create", { ngc });

      if (callback) {
        callback(response.data);
      }

      return response.data;
    } catch (err) {
      throw new Error("Error");
    }
  }
);

const galaxySearch = createAsyncThunk(
  "galaxy/search",
  async (
    { criteria, sortProperty, offset, limit, order, callback },
    { rejectWithValue }
  ) => {
    try {
      const response = await userApi.post("/galaxy/search", {
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

const galaxyDelete = createAsyncThunk(
  "galaxy/delete",
  async ({ galaxyId, callback }, { rejectWithValue }) => {
    try {
      const response = await userApi.post("/galaxy/delete", { galaxyId });

      if (callback) {
        callback(response.data);
      }

      return response.data;
    } catch (err) {
      throw new Error("Error");
    }
  }
);

const galaxyItem = createAsyncThunk(
  "galaxy/item",
  async ({ id, callback }, { rejectWithValue }) => {
    try {
      const response = await userApi.post("/galaxy/item", { id });

      if (callback) {
        callback(response.data);
      }

      return response.data;
    } catch (err) {
      throw new Error("Error");
    }
  }
);

const galaxyUpdateItem = createAsyncThunk(
  "galaxy/updateItem",
  async ({ data, callback }, { rejectWithValue }) => {
    try {
      const response = await userApi.post("/galaxy/updateItem", data);

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
      key !== "ngc"
    ) {
      updateData.$set[`${key}`] = criteria[key];
    }
  }

  return updateData;
}

const galaxyUpdateManyItems = createAsyncThunk(
  "galaxy/updateMany",
  async (
    { initialCriteria = {}, newCriteria, callback },
    { rejectWithValue }
  ) => {
    try {
      const updateData = convertCriteriaToUpdateData(newCriteria);

      const response = await userApi.post("/galaxy/updateMany", {
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

const galaxyDuplicate = createAsyncThunk(
  "galaxy/duplicateItem",
  async ({ galaxyId, callback }, { rejectWithValue }) => {
    try {
      const response = await userApi.post("/galaxy/duplicateItem", {
        galaxyId,
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

const galaxyNextItem = createAsyncThunk(
  "galaxy/nextItem",
  async (
    { id, sortProperty, order, criteria, callback },
    { rejectWithValue }
  ) => {
    try {
      const response = await userApi.post("/galaxy/nextItem", {
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

const galaxyPreviousItem = createAsyncThunk(
  "galaxy/previousItem",
  async (
    { id, sortProperty, order, criteria, callback },
    { rejectWithValue }
  ) => {
    try {
      const response = await userApi.post("/galaxy/previousItem", {
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
  galaxyCreate,
  galaxySearch,
  galaxyDelete,
  galaxyItem,
  galaxyUpdateItem,
  galaxyDuplicate,
  galaxyNextItem,
  galaxyPreviousItem,
  galaxyUpdateManyItems,
};
