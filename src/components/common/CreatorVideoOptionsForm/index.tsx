import { Button } from "@/components/ui/button"
import { api } from "@/lib/api"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from "@/components/ui/select"
import { FormEvent, useState } from "react"
import Icons from "../Icons"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { StatusToButtonEnum } from "@/utils/enum/StatusToButtonEnum"
import Notification from "@/utils/notification"
import { NotificationTypeEnum } from "@/utils/enum/NotificationTypeEnum"

interface ICreatorVideoOptionsForm {
    videoId: string | undefined,
    promptValue: string | undefined,
    uploadStatus: StatusToButtonEnum,
    getCompletion: Function,
    setGeneratorType: Function,
    generatorType: string
}

export default function CreatorVideoOptionsForm ({
    videoId,
    promptValue,
    uploadStatus,
    getCompletion,
    setGeneratorType,
    generatorType,
} : ICreatorVideoOptionsForm) {
    const [generationStatus, setGenerationStatus] = useState<StatusToButtonEnum>(StatusToButtonEnum.DISABLED);

    let temperature = 0.5;
    
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        try {
            setGenerationStatus(StatusToButtonEnum.LOADING)
            event.preventDefault()        
    
            const result = await api.post("/ai/content", {
                videoId,
                temperature,
                generatorType,
                promptValue: promptValue + " {transcription}"
            })     
    
            getCompletion(result.data)
            setGenerationStatus(StatusToButtonEnum.DONE)

            Notification(NotificationTypeEnum.success, 'Content Generated!')
        } catch (error: any) {
            console.log(error?.message);
            
            setGenerationStatus(StatusToButtonEnum.READ)
            Notification(NotificationTypeEnum.error, `Something wrong - ${error?.response?.data?.error ?? error?.message}`)
        }
    }
    
    return (
        <>
            <form className="space-y-8 w-full max-md:space-y-4" onSubmit={handleSubmit}>
                <Label htmlFor="type" className="max-md:text-xs">
                    Prompt Generation Type
                </Label>

                <Select defaultValue="video_description" onValueChange={(e: string) => setGeneratorType(e)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a prompt" />
                    </SelectTrigger>
                    <SelectContent >
                        <SelectGroup>
                            <SelectItem value="video_description">Video Description</SelectItem>
                            <SelectItem value="video_title">Video Title</SelectItem>
                            <SelectItem value="video_summary">Video Summary</SelectItem>
                            <SelectItem value="customize">Custom Prompt</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>

                <div className="space-y-2">
                    <Label className="max-md:text-xs">Model</Label>
                    <Select defaultValue='gpt3.5' disabled>
                        <SelectTrigger>
                        <SelectValue/>
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value='gpt3.5'>
                            GPT 3.5-turbo 16k
                        </SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <Separator />

                <div className="space-y-2">
                    <Label className="max-md:text-xs">Criative Temper</Label>
                    <Slider 
                        min={0}
                        max={1}
                        step={0.1}
                        defaultValue={[temperature]}
                        onValueChange={value => temperature = value[0]}
                    />
                    <span className='block text-xs text-muted-foreground italic leading-relaxed'>High values can apper some errors</span>
                </div>

                <Separator />

                <Button type='submit' className='w-full' disabled={uploadStatus !== StatusToButtonEnum.DONE || (generatorType == 'customize' && !promptValue)}>
                    {generationStatus !== StatusToButtonEnum.LOADING ? 
                        <>
                            <Icons iconName="wand-2" addClass="w-4 h-4 mx-2" overrideClass /> 
                            Execute
                        </> : 
                        <>
                            <svg aria-hidden="true" className="w-8 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 dark:fill-blue-50 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                            </svg>
                            Executing
                        </>
                    }
                </Button>
            </form>
        </>
    )
}