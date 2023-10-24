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
  video: VideoData | null;
  frontFile: string | null;
  uploadStatus: StatusToButtonEnum;
  generatorType: string;
  prompt: string | null;
  completion: string;
}

interface VideoActions {
  setVideo: (data: VideoData) => void;
  removeVideo: () => void;
  setCompletion: (completion: string) => void;
  setGeneratorType: (generatorType: string) => void;
  setPrompt: (prompt: string) => void;
  setVideoFile: (fileName: string) => void;
  setUploadStatus: (status: StatusToButtonEnum) => void;
}
interface creatorVideoStore {
  state: VideoState;
  actions: VideoActions;
}

export const creatorVideoStore = create<creatorVideoStore>((set) => ({
  state: {
    video: null,
    frontFile: null,
    uploadStatus: StatusToButtonEnum.DISABLED,
    completion: "",
    generatorType: "video_description",
    prompt: null,
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
          video: null,
        },
      })),
    setCompletion: (completion) =>
      set((state) => ({
        state: {
          ...state.state,
          completion: completion,
        },
      })),
    setGeneratorType: (generatorType) =>
      set((state) => ({
        state: {
          ...state.state,
          generatorType,
        },
      })),
    setPrompt: (prompt) =>
      set((state) => ({
        state: {
          ...state.state,
          prompt,
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
