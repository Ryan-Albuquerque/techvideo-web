"use client";

import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import CreatorVideoPromptSection from "@/components/common/CreatorVideoPromptSection";
import { StatusToButtonEnum } from "@/utils/enum/StatusToButtonEnum";
import CreatorVideoUploadForm from "@/components/common/CreatorVideoUploadForm";
import CreatorVideoOptionsForm from "@/components/common/CreatorVideoOptionsForm";
import { videoStore } from "@/store/video-store";

export default function YoutubeResourceCreator() {
  const {
    state: { uploadStatus, video },
  } = videoStore();

  //media generator
  const [videoPrompt, setVideoPrompt] = useState<string>("video_description");

  const [prompt, setPrompt] = useState<string>();

  //completion/result
  const [completion, setCompletion] = useState<string | undefined>();

  return (
    <>
      <main className="flex-1 flex min-h-screen max-sm:flex-col">
        <aside className="w-1/3 max-lg:w-2/5 max-sm:w-full max-sm:px-2 flex flex-col space-y-8 p-5">
          <CreatorVideoUploadForm />
          <Separator />
          <CreatorVideoOptionsForm
            videoId={video.id}
            promptValue={prompt}
            uploadStatus={uploadStatus}
            getCompletion={setCompletion}
            generatorType={videoPrompt}
            setGeneratorType={setVideoPrompt}
          />
        </aside>
        <CreatorVideoPromptSection
          completionValue={completion}
          setPromptValue={setPrompt}
          videoPromptOptions={videoPrompt}
        />
      </main>
    </>
  );
}
