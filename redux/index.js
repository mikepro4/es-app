import { setupListeners } from "@reduxjs/toolkit/query";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { signout } from "./thunks/userThunk";

// Reducers
import { appReducer } from "./slices/appSlice";
import { appDataReducer } from "./slices/appDataSlice";
import { userReducer } from "./slices/userSlice";
import { testListReducer } from "./slices/testListSlice";
import { shapeListReducer } from "./slices/shapeListSlice";
import { algoListReducer } from "./slices/algoListSlice";
import { trackListReducer } from "./slices/trackListSlice";
import { albumListReducer } from "./slices/albumListSlice";
import { hardwareListReducer } from "./slices/hardwareListSlice";
import { tierListReducer } from "./slices/tierListSlice";

import { audioSliceReducer } from "./slices/audioPlayerSlice";
import { galaxyListReducer } from "./slices/galaxyListSlice";
import { planetListReducer } from "./slices/planetListSlice";
import { keyboardReducer } from "./slices/keyboardSlice";
import { microphoneListenReducer } from "./slices/microphoneListenSlice";
import { iterationListReducer } from "./slices/iterationListSlice";

const rootReducer = combineReducers({
  app: appReducer,
  appData: appDataReducer,
  user: userReducer,
  testList: testListReducer,
  shapeList: shapeListReducer,
  algoList: algoListReducer,
  trackList: trackListReducer,
  albumList: albumListReducer,
  hardwareList: hardwareListReducer,
  tierList: tierListReducer,
  planetList: planetListReducer,
  audioPlayer: audioSliceReducer,
  galaxyList: galaxyListReducer,
  iterationList: iterationListReducer,
  keyboard: keyboardReducer,
  microphoneListen: microphoneListenReducer
});

const resettableReducer = (state, action) => {
  // Use the .fulfilled property of the signout action to get the correct action type
  if (action.type === signout.fulfilled.type) {
    state = {};
  }
  return rootReducer(state, action);
};

let middleware;

middleware = (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: false,
    thunk: true,
  });

export const store = configureStore({
  reducer: resettableReducer,
  middleware: middleware,
});

setupListeners(store.dispatch);

// =========================== //

// THUNKS

export * from "./thunks/userThunk";
export * from "./thunks/testThunk";
export * from "./thunks/shapeThunk";
export * from "./thunks/algoThunk";
export * from "./thunks/albumThunk";
export * from "./thunks/trackThunk";
export * from "./thunks/hardwareThunk";
export * from "./thunks/tierThunk";
export * from "./thunks/planetThunk";
export * from "./thunks/galaxyThunk";
export * from "./thunks/generatorThunk";

// =========================== //

// ACTIONS
export * from "./slices/appSlice";
export * from "./slices/userSlice";
export * from "./slices/iterationListSlice";
export * from "./slices/testListSlice";
export * from "./slices/shapeListSlice";
export * from "./slices/algoListSlice";
export * from "./slices/trackListSlice";
export * from "./slices/albumListSlice";
export * from "./slices/hardwareListSlice";
export * from "./slices/tierListSlice";
export * from "./slices/planetListSlice";
export * from "./slices/audioPlayerSlice";
export * from "./slices/galaxyListSlice";
export * from "./slices/keyboardSlice";
export * from "./slices/microphoneListenSlice";
export * from "./slices/appDataSlice";
