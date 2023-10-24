"use client";
import HubCard from "@/components/common/HubCard";

export default function StudentHub() {
  return (
    <>
      <main className="grid grid-cols-6 gap-16 mx-16 my-10 max-md:grid-cols-2 max-xl:grid-cols-4 max-xl:mx-4">
        {/* to see what icon use link to https://lucide.dev/icons/ */}
        <HubCard
          hasHoverContent
          name="Generate By Video"
          icon="video"
          linkTo="/student/generate-by-video"
          headerDescription="Generate content by video"
          bodyDescription="Create Summary-Create Transcription"
          footerDescription="Everything from 1 video"
        />
        <HubCard
          hasHoverContent
          name="Ask me"
          icon="pencil-ruler"
          linkTo="/student/ask-me"
          headerDescription="Ask me whatever you want!"
          bodyDescription="Needing help with some subject? Ask me-Needing help with tasks? Ask me-Anything else? Ask me!"
        />
      </main>
    </>
  );
}
