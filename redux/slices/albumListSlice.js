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

const albumListSlice = createSlice({
  name: "albumList",
  initialState,
  reducers: {
    albumListChangeSort: (state, action) => {

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

    albumListChangeCriteria: (state, action) => {
        state.criteria = {
            ...state.criteria,
            ...action.payload
        }
    },

    albumListUpdateStats: (state, action) => {
        state.count = action.payload.count;
        state.total = action.payload.total;
    },

    albumResetCriteria: (state, action) => {
      state.criteria = {}
    }
  }
});

export const { 
    albumListChangeSort,
    albumListChangeCriteria,
    albumListUpdateStats,
    albumResetCriteria
} = albumListSlice.actions;

export const albumListReducer = albumListSlice.reducer;
