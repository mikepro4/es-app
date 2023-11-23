import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sortProperty: "created",
    order: "-1"
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
  }
});

export const { 
    testListChangeSort
} = testListSlice.actions;

export const testListReducer = testListSlice.reducer;
