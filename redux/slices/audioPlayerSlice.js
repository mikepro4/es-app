import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    playing: false,
    currentTime: 0,
    duration: 0,
    volume: 1,
};

export const audioSlice = createSlice({
    name: 'audioPlayer',
    initialState,
    reducers: {
        togglePlay: (state) => {
            state.playing = !state.playing;
        },
        setCurrentTime: (state, action) => {
            state.currentTime = action.payload;
        },
        setDuration: (state, action) => {
            state.duration = action.payload;
        },
        setVolume: (state, action) => {
            state.volume = action.payload; // Reducer to set the volume
        },
        // other reducers...
    },
});

export const { togglePlay, setCurrentTime, setDuration, setVolume } = audioSlice.actions;

export const audioSliceReducer = audioSlice.reducer;