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

const trackListSlice = createSlice({
  name: "trackList",
  initialState,
  reducers: {
    trackListChangeSort: (state, action) => {

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

    trackListChangeCriteria: (state, action) => {
        state.criteria = {
            ...state.criteria,
            ...action.payload
        }
    },

    trackListUpdateStats: (state, action) => {
        state.count = action.payload.count;
        state.total = action.payload.total;
    },

    trackResetCriteria: (state, action) => {
      state.criteria = {}
    }
  }
});

export const { 
    trackListChangeSort,
    trackListChangeCriteria,
    trackListUpdateStats,
    trackResetCriteria
} = trackListSlice.actions;

export const trackListReducer = trackListSlice.reducer;
