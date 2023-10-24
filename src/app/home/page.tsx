"use client";

import Typewriter from "@/components/common/TypeWriter";
import HubCard from "@/components/common/HubCard";

export default function Home() {
  return (
    <>
      <main className="flex flex-col items-center mt-32">
        <div className="pb-12 max-sm:pb-6">
          <h1 className="text-4xl font-extrabold text-center max-md:text-3xl max-sm:text-2xl">
            Welcome to
            <Typewriter text=" TechVideo.AI" infinite delay={170} />
          </h1>

          <p className="mt-6 text-center">
            <Typewriter
              text="A web app to help you with what you need using AI"
              delay={100}
            />
          </p>
        </div>

        <div className="grid w-1/3 grid-cols-2 gap-20 mx-16 my-10 max-xl:w-1/2 max-sm:w-full max-md:px-10">
          <HubCard
            icon="graduation-cap"
            linkTo="/student/hub"
            name="STUDENT"
            hasHoverContent
            bodyDescription="Generate content from video-Ask anything"
            footerDescription="Using AI to help you"
          />
          <HubCard
            icon="brain"
            linkTo="/creator/hub"
            name="CREATOR"
            hasHoverContent
            bodyDescription="Generate content from video"
            footerDescription="Perfect to Youtube creators"
          />
        </div>
      </main>
    </>
  );
}
