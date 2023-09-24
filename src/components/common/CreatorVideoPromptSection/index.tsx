import { Textarea } from "@/components/ui/textarea";

interface ICreatorVideoSection {
    setPromptValue: Function, 
    videoPromptOptions: string | undefined,
    completionValue: string | undefined
}

export default function CreatorVideoPromptSection ({setPromptValue, videoPromptOptions, completionValue} : ICreatorVideoSection) {
    const handlePromptValue = (e: React.FocusEvent<HTMLElement>) => {
        setPromptValue(e?.target?.value)
    }
    
    return (
        <>
            <section className="flex flex-col flex-1 gap-4">
                <div className="flex flex-col gap-4 p-5 flex-1">
                    <Textarea
                        placeholder="Add Prompt command."
                        className="resize-none h-1/2 leading-relaxed"
                        onBlur={handlePromptValue}
                        readOnly={videoPromptOptions !== 'customize'}
                    />
                    <Textarea
                        placeholder="Result"
                        readOnly
                        className="resize-none h-1/2 leading-relaxed"
                        value={completionValue}
                    />
                </div>
            </section>
        </>
    )
}