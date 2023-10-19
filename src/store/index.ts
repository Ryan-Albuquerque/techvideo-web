import { configureStore } from "@reduxjs/toolkit";
import { logger } from "redux-logger";
import videoReducer from "./video/reducer";

const store = configureStore({
  reducer: {
    video: videoReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
