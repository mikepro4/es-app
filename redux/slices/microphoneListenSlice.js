import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isMicrophoneListen: false,
    microphoneAnalyser: null,
    micConnect: false
};

export const microphoneListenSlice = createSlice({
    name: 'microphoneListen',
    initialState,
    reducers: {


        setMicrophoneAnalyser: (state, action) => {
            state.microphoneAnalyser = action.payload;
        },
        toggleMicrophone: (state, action) => {
            state.isMicrophoneListen = !state.isMicrophoneListen;
        },
        setMicrophoneConnected: (state, action) => {
            state.micConnect = action.payload;
        },
        clearMicrophoneState: (state, action) => {
            Object.assign(state, initialState);
        },

    },
});

export const { setMicrophoneAnalyser, toggleMicrophone, setMicrophoneConnected, clearMicrophoneState } = microphoneListenSlice.actions;

export const microphoneListenReducer = microphoneListenSlice.reducer;