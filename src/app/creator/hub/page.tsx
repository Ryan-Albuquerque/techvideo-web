"use client"
import HubCard from "@/components/common/HubCard";

export default function CreatorHub() {
    return (
        <>
            <main className="gap-16 grid grid-cols-6 max-md:grid-cols-2 max-xl:grid-cols-4 max-xl:mx-4 my-10 mx-16">
                {/* to see what icon use link to https://lucide.dev/icons/ */}
                <HubCard hasHoverContent name="Youtube Creator" icon="youtube" linkTo="/creator/youtube-resource" bodyDescription="Create a title-Create a description-Generate a summary" footerDescription="Everything from 1 video"/>
            </main>
        </>
    )
}