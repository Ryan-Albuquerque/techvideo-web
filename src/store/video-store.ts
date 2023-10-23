import { StatusToButtonEnum } from "@/utils/enum/StatusToButtonEnum";
import { StateCreator, create } from "zustand";

interface VideoData {
  id: string;
  name?: string;
  path?: string;
  transcription?: string;
  createdAt?: string;
  uploadName?: string;
}

interface VideoState {
  video: VideoData | {};
  frontFile: string | null;
  uploadStatus: StatusToButtonEnum | null;
}

interface VideoActions {
  setVideo: (data: VideoData) => void;
  removeVideo: () => void;
  setTranscription: (transcription: string) => void;
  setVideoFile: (fileName: string) => void;
  setUploadStatus: (status: StatusToButtonEnum) => void;
}
interface VideoStore {
  state: VideoState;
  actions: VideoActions;
}

export const videoStore = create<VideoStore>((set) => ({
  state: {
    video: {},
    frontFile: null,
    uploadStatus: StatusToButtonEnum.DISABLED,
  },
  actions: {
    setVideo: (data) =>
      set((state) => ({
        state: {
          ...state.state,
          video: { ...data },
        },
      })),
    removeVideo: () =>
      set((state) => ({
        state: {
          ...state.state,
          video: {},
        },
      })),
    setTranscription: (transcription) =>
      set((state) => ({
        state: {
          ...state.state,
          video: { ...state.state.video, transcription },
        },
      })),
    setVideoFile: (fileName) =>
      set((state) => ({
        state: {
          ...state.state,
          frontFile: fileName,
        },
      })),
    setUploadStatus: (status) =>
      set((state) => ({
        state: {
          ...state.state,
          uploadStatus: status,
        },
      })),
  },
}));
