import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  drawerOpen: false,
  drawerType: null,
  drawerData: null,
  draweDraggable: false,
  drawerHeight: null,
  notificationActive: false,
  notificationMessage: null,
  notificationIntent: null,
  notificationDuration: null,
  alertActive: false,
  alertMessage: null,
  alertIntent: null,
  alertDuration: null,
  alertIcon: null,
  modalOpen: false,
  modalType: null,
  modalData: null,
  updateCollection: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    updateCollection: (state, action) => {
      state.updateCollection = action.payload;
    },
    toggleDrawer: (state, action) => {
      state.drawerOpen = action.payload.drawerOpen;
      state.drawerType = action.payload.drawerType;
      state.drawerData = action.payload.drawerData;
      state.drawerDraggable = action.payload.drawerDraggable;
      state.drawerHeight = action.payload.drawerHeight;
    },
    toggleNotification: (state, action) => {
      state.notificationActive = action.payload.notificationActive;
      state.notificationMessage = action.payload.notificationMessage;
      state.notificationIntent = action.payload.notificationIntent;
      state.notificationDuration = action.payload.notificationDuration;
    },
    toggleAlert: (state, action) => {
      state.alertActive = action.payload.alertActive;
      state.alertMessage = action.payload.alertMessage;
      state.alertIntent = action.payload.alertIntent;
      state.alertDuration = action.payload.alertDuration;
      state.alertIcon = action.payload.alertIcon;
    },
    toggleModal: (state, action) => {
      state.modalOpen = action.payload.modalOpen;
      state.modalType = action.payload.modalType;
      state.modalData = action.payload.modalData;
    },
  }
});

export const { 
    toggleDrawer, 
    toggleNotification,
    toggleAlert,
    toggleModal,
    updateCollection
} = appSlice.actions;

export const appReducer = appSlice.reducer;
