import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentTime: 0,
    duration: 0,
    volume: 0.8,
    connected: false,
    analyser: null,
    audioLink: "",
    id: "",
    audioName: "",
    isPlaying: false,
    playerControls: false,
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
        setAnalyser: (state, action) => {
            state.analyser = action.payload;
        },
        setConnected: (state, action) => {
            state.connected = action.payload;
        },
        setAudioLink: (state, action) => {
            state.audioLink = action.payload;
        },
        setAudioId: (state, action) => {
            state.id = action.payload;
        },
        togglePlayPause: (state, action) => {
            state.isPlaying = !state.isPlaying;
        },
        setIsPlaying: (state, action) => {
            state.isPlaying = action.payload;
        },
        setAudioName: (state, action) => {
            state.audioName = action.payload;
        },
        togglePlayerControls: (state, action) => {
            state.playerControls = !state.playerControls;
        },
        resetPlayer: (state) => {
            Object.assign(state, initialState);
        }
    },
});

export const { setCurrentTime, setDuration, setVolume, setAnalyser, setConnected, resetPlayer, setAudioLink, setAudioId, togglePlayPause, setIsPlaying, togglePlayerControls, setAudioName, } = audioSlice.actions;

export const audioSliceReducer = audioSlice.reducer;