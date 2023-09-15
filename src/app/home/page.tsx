"use client"

import { Button } from "@/components/ui/button";
import { Brain, GraduationCap } from 'lucide-react';
import Typewriter from "@/components/common/TypeWriter";
import Link from "next/link";

export default function Home() {
    return(
        <>
            <main className="flex flex-col items-center mt-32">
                <div className="pb-32 max-sm:pb-24">
                    <h1 className="font-extrabold text-4xl max-md:text-3xl max-sm:text-2xl">
                        Welcome to
                        <Typewriter text=" TechVideo.AI" infinite delay={150}/>
                    </h1>
                </div>

                <div className="flex justify-between h-96 w-1/2 gap-96 max-sm:gap-10 max-xl:gap-32 max-xl:w-4/6">
                    <Link href={"/creator/hub"} passHref legacyBehavior>
                        <Button className="w-1/3 h-1/3 pt-2 bg-purple-950 flex flex-col hover:bg-purple-600 max-xl:3/4 max-lg:w-1/2 max-sm:h-1/4">
                            <Brain size={70} className="mb-6 mt-1 max-sm:mb-3"/>
                            CREATOR
                        </Button> 
                    </Link>
                    <Link href={"/student/hub"} passHref legacyBehavior>
                        <Button className="w-1/3 h-1/3 bg-purple-950 hover:bg-purple-500 flex flex-col max-xl:3/4 max-lg:w-1/2 max-sm:h-1/4">
                            <GraduationCap size={70} className="mb-6 mt-1 max-sm:mb-3"/>
                            STUDENT
                        </Button>
                    </Link>
                </div>
            </main>
        </>
    )
}