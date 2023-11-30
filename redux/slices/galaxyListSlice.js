import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sortProperty: "created",
  order: "-1",
  criteria: {
    // status: "approved"
  },
  count: 0,
  total: 0,
};

const galaxyListSlice = createSlice({
  name: "galaxyList",
  initialState,
  reducers: {
    galaxyListChangeSort: (state, action) => {
      if (action.payload == "recent") {
        state.sortProperty = "created";
        state.order = "-1";
      }

      if (action.payload == "oldest") {
        state.sortProperty = "created";
        state.order = "1";
      }

      if (action.payload == "name") {
        state.sortProperty = "name";
        state.order = "-1";
      }
    },

    galaxyListChangeCriteria: (state, action) => {
      state.criteria = {
        ...state.criteria,
        ...action.payload,
      };
    },

    galaxyListUpdateStats: (state, action) => {
      state.count = action.payload.count;
      state.total = action.payload.total;
    },

    galaxyResetCriteria: (state, action) => {
      state.criteria = {};
    },
  },
});

export const {
  galaxyListChangeSort,
  galaxyListChangeCriteria,
  galaxyListUpdateStats,
  galaxyResetCriteria,
} = galaxyListSlice.actions;

export const galaxyListReducer = galaxyListSlice.reducer;
