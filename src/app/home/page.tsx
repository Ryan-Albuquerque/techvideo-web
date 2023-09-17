"use client"

import { Button } from "@/components/ui/button";
import { Brain, GraduationCap } from 'lucide-react';
import Typewriter from "@/components/common/TypeWriter";
import Link from "next/link";
import HubCard from "@/components/common/HubCard";

export default function Home() {
    return(
        <>
            <main className="flex flex-col items-center mt-32">
                <div className="pb-12 max-sm:pb-6">
                    <h1 className="font-extrabold text-4xl max-md:text-3xl max-sm:text-2xl text-center">
                        Welcome to
                        <Typewriter text=" TechVideo.AI" infinite delay={150}/>
                    </h1>

                    <p className="mt-6 text-center"><Typewriter text="A web app to assist you with your media using AI" delay={150}/></p>
                </div>

                <div className="gap-20 grid grid-cols-2 w-1/3 max-xl:w-1/2 max-sm:w-full max-md:px-10 my-10 mx-16">
                    <HubCard icon="brain" linkTo="/creator/hub" name="CREATOR" hasHoverContent={false} />
                    <HubCard icon="graduation-cap" linkTo="/student/hub" name="STUDENT" hasHoverContent={false} />
                </div>
            </main>
        </>
    )
}