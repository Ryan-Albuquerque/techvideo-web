import { Separator } from "@/components/ui/separator";
import CreatorVideoPromptSection from "@/components/common/CreatorVideoPromptSection";
import CreatorVideoUploadForm from "@/components/common/CreatorVideoUploadForm";
import CreatorVideoOptionsForm from "@/components/common/CreatorVideoOptionsForm";

export default function YoutubeResourceCreator() {
  return (
    <>
      <main className="flex-1 flex min-h-screen max-sm:flex-col">
        <aside className="w-1/3 max-lg:w-2/5 max-sm:w-full max-sm:px-2 flex flex-col space-y-8 p-5">
          <CreatorVideoUploadForm />
          <Separator />
          <CreatorVideoOptionsForm />
        </aside>
        <CreatorVideoPromptSection />
      </main>
    </>
  );
}
