import { Textarea } from "@/components/ui/textarea";
import { useEffect } from "react";

interface ICreatorVideoSection {
    setPromptValue: Function, 
    videoPromptOptions: string,
    completionValue: string | undefined
}

export default function CreatorVideoPromptSection ({setPromptValue, videoPromptOptions, completionValue} : ICreatorVideoSection) {
    const handlePromptValue = (e: React.FocusEvent<HTMLTextAreaElement>) => {
        setPromptValue(e?.target?.value)
    }    

    useEffect(() => {
        if(videoPromptOptions !== 'customize') {
            document.getElementById('prompt')?.classList.add('hidden')
        } else {
            document.getElementById('prompt')?.classList.remove('hidden')
        }

    }, [videoPromptOptions])
    
    return (
        <>
            <section className="flex flex-col flex-1 gap-4">
                <div className="flex flex-col gap-4 p-5 flex-1 max-md:p-1 max-md:pt-5 max-sm:mb-5">
                    <Textarea
                        placeholder={"Add Prompt command." + "\n" + "Egg.: What is the more significant word mentioned in the video?"}
                        id="prompt"
                        className="resize-none h-1/2 leading-relaxed max-md:text-xs min-h-[300px]"
                        onBlur={handlePromptValue}
                        readOnly={videoPromptOptions !== 'customize'}
                    />
                    <Textarea
                        placeholder="Result"
                        readOnly
                        className="resize-none h-1/2 leading-relaxed max-md:text-xs min-h-[300px]"
                        value={completionValue}
                    />
                </div>
            </section>
        </>
    )
}