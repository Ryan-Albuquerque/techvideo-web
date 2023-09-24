import { Button } from "@/components/ui/button"
import { api } from "@/lib/api"
import { StatusUploadVideoEnum } from "@/utils/enum/StatusUploadVideoEnum"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from "@/components/ui/select"
import { FormEvent, useState } from "react"
import Icons from "../Icons"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"

interface ICreatorVideoOptionsForm {
    videoId: string | undefined,
    promptValue: string | undefined,
    uploadStatus: StatusUploadVideoEnum,
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
    let temperature = 0.5;
    
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()        

        const result = await api.post("/complete", {
            videoId,
            temperature,
            generatorType
        })

        getCompletion(result.data.completion)
    }
    
    return (
        <>
            <form className="space-y-8 w-full" onSubmit={handleSubmit}>
                <Label htmlFor="type">
                    Prompt
                </Label>

                <Select defaultValue="customize" onValueChange={(e) => setGeneratorType(e)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a prompt" />
                    </SelectTrigger>
                    <SelectContent >
                        <SelectGroup>
                            <SelectItem value="customize">Custom Prompt</SelectItem>
                            <SelectItem value="video_description">Video Description</SelectItem>
                            <SelectItem value="video_title">Video Title</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>

                <div className="space-y-2">
                    <Label>Model</Label>
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
                    <Label>Criative Temper</Label>
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

                <Button type='submit' className='w-full' disabled={uploadStatus !== StatusUploadVideoEnum.DONE || (generatorType == 'customize' && !promptValue)}>
                    Execute
                    <Icons iconName="wand-2" addClass='w-4 h-4 ml-2' overrideClass/>
                </Button>
            </form>
        </>
    )
}