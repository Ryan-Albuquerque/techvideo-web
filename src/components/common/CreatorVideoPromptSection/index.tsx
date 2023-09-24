import { Textarea } from "@/components/ui/textarea";

interface ICreatorVideoSection {
    setPromptValue: Function, 
    videoPromptOptions: string | undefined,
    completionValue: string | undefined
}

export default function CreatorVideoPromptSection ({setPromptValue, videoPromptOptions, completionValue} : ICreatorVideoSection) {
    const handlePromptValue = (e: React.FocusEvent<HTMLTextAreaElement>) => {
        setPromptValue(e?.target?.value)
    }
    
    return (
        <>
            <section className="flex flex-col flex-1 gap-4">
                <div className="flex flex-col gap-4 p-5 flex-1 max-md:p-1 max-md:pt-5">
                    <Textarea
                        placeholder={"Add Prompt command." + "\n" + "Egg.: What is the more significant word mentioned in the video?"}
                        className="resize-none h-1/2 leading-relaxed max-md:text-xs"
                        onBlur={handlePromptValue}
                        readOnly={videoPromptOptions !== 'customize'}
                    />
                    <Textarea
                        placeholder="Result"
                        readOnly
                        className="resize-none h-1/2 leading-relaxed max-md:text-xs"
                        value={completionValue}
                    />
                </div>
            </section>
        </>
    )
}