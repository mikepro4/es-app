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

const shapeListSlice = createSlice({
  name: "shapeList",
  initialState,
  reducers: {
    shapeListChangeSort: (state, action) => {

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

      if(action.payload == "mostApproved") {
        state.sortProperty = "iterationsVerified"
        state.order = "-1"
      }

      if(action.payload == "leastApproved") {
        state.sortProperty = "iterationsVerified"
        state.order = "1"
      }

      if(action.payload == "mostUnreviewed") {
        state.sortProperty = "iterationsUnverified"
        state.order = "-1"
      }

      if(action.payload == "mostRejected") {
        state.sortProperty = "iterationsRejected"
        state.order = "-1"
      }
    },

    shapeListChangeCriteria: (state, action) => {
        state.criteria = {
            ...state.criteria,
            ...action.payload
        }
    },

    shapeListUpdateStats: (state, action) => {
        state.count = action.payload.count;
        state.total = action.payload.total;
    },

    shapeResetCriteria: (state, action) => {
      state.criteria = {}
    }
  }
});

export const { 
    shapeListChangeSort,
    shapeListChangeCriteria,
    shapeListUpdateStats,
    shapeResetCriteria
} = shapeListSlice.actions;

export const shapeListReducer = shapeListSlice.reducer;
