import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentTime: 0,
    duration: 0,
    volume: 1,
    connected: false,
    audioContext: null,
    analyser: null,

};

export const audioSlice = createSlice({
    name: 'audioPlayer',
    initialState,
    reducers: {

        setCurrentTime: (state, action) => {
            state.currentTime = action.payload;
        },
        setDuration: (state, action) => {
            state.duration = action.payload;
        },
        setVolume: (state, action) => {
            state.volume = action.payload;
        },
        setAudioContext: (state, action) => {
            state.audioContext = action.payload;
        },
        setAnalyser: (state, action) => {
            state.analyser = action.payload;
        },
        setConnected: (state, action) => {
            state.connected = action.payload;
        },
        resetPlayer: (state) => {
            Object.assign(state, initialState);
        }
    },
});

export const { setCurrentTime, setDuration, setVolume, setAudioContext, setAnalyser, setConnected, resetPlayer } = audioSlice.actions;

export const audioSliceReducer = audioSlice.reducer;