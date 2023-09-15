"use client"
import { Button } from "@/components/ui/button";
import { Youtube } from "lucide-react";
import Link from "next/link";

export default function CreatorHub() {

    const handleDescriptionCard = (e: any) => {
        e?.currentTarget?.children[1].classList.remove('hidden')
    }

    const unhandleDescriptionCard = (e: any) => {
        e?.currentTarget?.children[1].classList.add('hidden')
    }

    return (
        <>
            <main className="gap-16 grid grid-cols-6 max-md:grid-cols-2 max-xl:grid-cols-4 my-10 mx-16">
                <Link href={"/creator/youtube-resource"} passHref legacyBehavior>
                    <div className="relative"  onMouseEnter={handleDescriptionCard} onMouseOut={unhandleDescriptionCard}>
                        <Button className="w-full h-full pt-2 shadow-lg shadow-purple-950 bg-purple-950 flex flex-col hover:opacity-10">
                            <Youtube size={70} className="mb-6 mt-1 max-sm:h-1/3"/>
                            Youtube Creation
                        </Button> 
                        <div className="absolute z-50 break-all top-0 text-center my-2 mx-4 text-xs hidden">
                            <p>As a youtuber you can:</p>
                            <br/>
                            <ul>
                                <li>&#8226; Create a title</li>
                                <li>&#8226; Create a description</li>
                                <li>&#8226; Generate a summary</li>
                            </ul>
                            <br/>  
                            <p>Everything from 1 video</p>
                        </div>
                    </div>
                </Link>
            </main>
        </>
    )
}