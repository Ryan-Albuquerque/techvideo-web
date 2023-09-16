"use client"
import { Button } from "@/components/ui/button";
import { Youtube } from "lucide-react";
import Link from "next/link";

export default function CreatorHub() {
    return (
        <>
            <main className="gap-16 grid grid-cols-6 max-md:grid-cols-2 max-xl:grid-cols-4 my-10 mx-16">
                <Link href={"/creator/youtube-resource"} passHref legacyBehavior>
                    <div className="relative group">
                        <Button className="group-hover:opacity-20 w-full h-full pt-2 shadow-lg shadow-purple-950 bg-purple-950 flex flex-col">
                            <Youtube size={70} className="mb-6 mt-1 max-sm:h-1/3"/>
                            Youtube Creation
                        </Button> 
                        <div className="group-hover:visible group-hover:opacity-100 absolute top-0 bottom-0 left-0 right-0 opacity-0 flex items-center justify-center flex-col py-5 text-xs font-bold transition-opacity ease-in duration-200 cursor-pointer">
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