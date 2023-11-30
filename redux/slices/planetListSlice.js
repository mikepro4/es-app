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

const planetListSlice = createSlice({
  name: "planetList",
  initialState,
  reducers: {
    planetListChangeSort: (state, action) => {
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

    planetListChangeCriteria: (state, action) => {
      state.criteria = {
        ...state.criteria,
        ...action.payload,
      };
    },

    planetListUpdateStats: (state, action) => {
      state.count = action.payload.count;
      state.total = action.payload.total;
    },

    planetResetCriteria: (state, action) => {
      state.criteria = {};
    },
  },
});

export const {
  planetListChangeSort,
  planetListChangeCriteria,
  planetListUpdateStats,
  planetResetCriteria,
} = planetListSlice.actions;

export const planetListReducer = planetListSlice.reducer;
