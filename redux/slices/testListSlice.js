import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sortProperty: "created",
    order: "-1",
    criteria: {

    },
    count: 0,
    total: 0
};

const testListSlice = createSlice({
  name: "testList",
  initialState,
  reducers: {
    testListChangeSort: (state, action) => {

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

    testListChangeCriteria: (state, action) => {
        state.criteria = {
            ...state.criteria,
            ...action.payload
        }
    },

    testListUpdateStats: (state, action) => {
        state.count = action.payload.count;
        state.total = action.payload.total;
    },

    testResetCriteria: (state, action) => {
      state.criteria = {}
    }
  }
});

export const { 
    testListChangeSort,
    testListChangeCriteria,
    testListUpdateStats,
    testResetCriteria
} = testListSlice.actions;

export const testListReducer = testListSlice.reducer;
