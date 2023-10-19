import { createSlice } from "@reduxjs/toolkit";
import { Video } from "./type";

const initialState: { video: Video | null } = { video: null };
const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    add: (state, action) => {
      return { video: { ...state.video, ...action.payload } };
    },
    remove: (state) => {
      return { video: null };
    },
    add_transcription: (state, action) => {
      if (state.video?.id) {
        return {
          video: {
            ...state.video,
            transcription: action.payload.transcription,
          },
        };
      }
    },
  },
});

export const { add, remove, add_transcription } = videoSlice.actions;
export default videoSlice.reducer;
