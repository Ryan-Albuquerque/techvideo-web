import { Separator } from "@/components/ui/separator";
import CreatorVideoPromptSection from "@/components/common/CreatorVideoPromptSection";
import CreatorVideoUploadForm from "@/components/common/CreatorVideoUploadForm";
import CreatorVideoOptionsForm from "@/components/common/CreatorVideoOptionsForm";

export default function YoutubeResourceCreator() {
  return (
    <>
      <main className="flex flex-1 min-h-screen max-sm:flex-col">
        <aside className="flex flex-col w-1/3 p-5 space-y-8 max-lg:w-2/5 max-sm:w-full max-sm:px-2">
          <CreatorVideoUploadForm />
          <Separator />
          <CreatorVideoOptionsForm />
        </aside>
        <CreatorVideoPromptSection />
      </main>
    </>
  );
}
