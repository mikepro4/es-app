// store/keyboardSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const keyboardSlice = createSlice({
  name: 'keyboard',
  initialState: {
    activeKeys: [],
  },
  reducers: {
    keyDown: (state, action) => {
      // Add key to activeKeys if not already present
      const key = action.payload.toUpperCase();
      if (!state.activeKeys.includes(key)) {
        state.activeKeys.push(key);
      }
    },
    keyUp: (state, action) => {
      // Remove key from activeKeys
      const key = action.payload.toUpperCase();
      // state.activeKeys = state.activeKeys.filter(activeKey => activeKey !== key);

      if (key !== 'SHIFT') {
          // If the released key is not SHIFT, then remove all keys except SHIFT
          state.activeKeys = state.activeKeys.filter(activeKey => activeKey === 'SHIFT');
      } else {
          // If SHIFT is released, remove it from activeKeys
          state.activeKeys = state.activeKeys.filter(activeKey => activeKey !== 'SHIFT');
      }
    },
  },
});

export const { 
    keyDown, 
    keyUp 
} = keyboardSlice.actions;

export const keyboardReducer = keyboardSlice.reducer;
