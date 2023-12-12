import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    algos: [],
    tracks: [],
    tiers: []
};

const appDataSlice = createSlice({
  name: "appDataList",
  initialState,
  reducers: {
    setAlgos: (state, action) => {
      state.algos = action.payload
    },
    setTracks: (state, action) => {
        state.tracks = action.payload
    },
    setTiers: (state, action) => {
        state.tiers = action.payload
    }
  }
});

export const { 
    setAlgos,
    setTracks,
    setTiers
} = appDataSlice.actions;

export const appDataReducer = appDataSlice.reducer;
