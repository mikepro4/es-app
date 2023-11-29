import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sortProperty: "created",
    order: "-1",
    criteria: {
      // status: "approved"
    },
    count: 0,
    total: 0
};

const tierListSlice = createSlice({
  name: "tierList",
  initialState,
  reducers: {
    tierListChangeSort: (state, action) => {

      if(action.payload == "recent") {
        state.sortProperty = "created"
        state.order = "-1"
      }

      if(action.payload == "oldest") {
        state.sortProperty = "created"
        state.order = "1"
      }

      if(action.payload == "name") {
        state.sortProperty = "name"
        state.order = "-1"
      }
    },

    tierListChangeCriteria: (state, action) => {
        state.criteria = {
            ...state.criteria,
            ...action.payload
        }
    },

    tierListUpdateStats: (state, action) => {
        state.count = action.payload.count;
        state.total = action.payload.total;
    },

    tierResetCriteria: (state, action) => {
      state.criteria = {}
    }
  }
});

export const { 
    tierListChangeSort,
    tierListChangeCriteria,
    tierListUpdateStats,
    tierResetCriteria
} = tierListSlice.actions;

export const tierListReducer = tierListSlice.reducer;
