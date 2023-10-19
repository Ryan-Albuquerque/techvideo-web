import { configureStore } from "@reduxjs/toolkit";
import videoReducer from "./video/reducer";

const store = configureStore({
  reducer: {
    video: videoReducer,
  },
});

export default store;
