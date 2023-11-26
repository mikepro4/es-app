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

const algoListSlice = createSlice({
  name: "algoList",
  initialState,
  reducers: {
    algoListChangeSort: (state, action) => {

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

    algoListChangeCriteria: (state, action) => {
        state.criteria = {
            ...state.criteria,
            ...action.payload
        }
    },

    algoListUpdateStats: (state, action) => {
        state.count = action.payload.count;
        state.total = action.payload.total;
    },

    algoResetCriteria: (state, action) => {
      state.criteria = {}
    }
  }
});

export const { 
    algoListChangeSort,
    algoListChangeCriteria,
    algoListUpdateStats,
    algoResetCriteria
} = algoListSlice.actions;

export const algoListReducer = algoListSlice.reducer;
