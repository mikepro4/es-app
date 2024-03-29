import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sortProperty: "created",
    order: "-1",
    criteria: {
      status: "unreviewed",
      iteration: true
    },
    count: 0,
    total: 0
};

const iterationListSlice = createSlice({
  name: "iterationList",
  initialState,
  reducers: {
    iterationListChangeSort: (state, action) => {

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

    iterationListChangeCriteria: (state, action) => {
        state.criteria = {
            ...state.criteria,
            ...action.payload
        }
    },

    iterationListUpdateStats: (state, action) => {
        state.count = action.payload.count;
        state.total = action.payload.total;
    },

    iterationResetCriteria: (state, action) => {
      state.criteria = {}
    }
  }
});

export const { 
    iterationListChangeSort,
    iterationListChangeCriteria,
    iterationListUpdateStats,
    iterationResetCriteria
} = iterationListSlice.actions;

export const iterationListReducer = iterationListSlice.reducer;
