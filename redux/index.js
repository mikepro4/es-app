import { setupListeners } from "@reduxjs/toolkit/query";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { signout } from "./thunks/userThunk";

// Reducers
import { appReducer } from "./slices/appSlice";
import { userReducer } from "./slices/userSlice";
import { testListReducer } from "./slices/testListSlice";
import { shapeListReducer } from "./slices/shapeListSlice";

const rootReducer = combineReducers({
  app: appReducer,
  user: userReducer,
  testList: testListReducer,
  shapeList: shapeListReducer
});

const resettableReducer = (state, action) => {
  // Use the .fulfilled property of the signout action to get the correct action type
  if (action.type === signout.fulfilled.type) {
    state = {
    };
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


// =========================== //


// ACTIONS
export * from "./slices/appSlice";
export * from "./slices/userSlice";
export * from "./slices/testListSlice";

