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

const hardwareListSlice = createSlice({
  name: "hardwareList",
  initialState,
  reducers: {
    hardwareListChangeSort: (state, action) => {

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

    hardwareListChangeCriteria: (state, action) => {
        state.criteria = {
            ...state.criteria,
            ...action.payload
        }
    },

    hardwareListUpdateStats: (state, action) => {
        state.count = action.payload.count;
        state.total = action.payload.total;
    },

    hardwareResetCriteria: (state, action) => {
      state.criteria = {}
    }
  }
});

export const { 
    hardwareListChangeSort,
    hardwareListChangeCriteria,
    hardwareListUpdateStats,
    hardwareResetCriteria
} = hardwareListSlice.actions;

export const hardwareListReducer = hardwareListSlice.reducer;
