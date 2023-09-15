"use client"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { FileVideo, Upload, Wand2 } from "lucide-react"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

export default function YoutubeResourceCreator() {
    return(
        <>
            <main className="flex-1 flex min-h-screen">
                <section className="flex flex-col flex-1 gap-4">
                    <div className="flex flex-col gap-4 p-5 flex-1">
                        <Textarea
                            placeholder="Add Prompt command"
                            className="resize-none h-1/2 leading-relaxed"
                        />
                        <Textarea
                            placeholder="Result"
                            readOnly
                            className="resize-none h-1/2 leading-relaxed"
                        />
                    </div>
                </section>
                <aside className="w-1/4 flex flex-col space-y-8 p-5">
                    <form className='space-y-6 w-full'>
                        <label 
                            htmlFor="video"
                            className='border flex rounded-md aspect-video cursor-pointer border-dashed text-sm flex-col gap-2 items-center justify-center text-muted-foreground hover:bg-primary/5'
                        >
                            <FileVideo className='w-4 h-4'/>
                            Upload a video
                        </label>
                        <input type="file" id="video" accept='video/mp4' className='sr-only'/>

                        <div className="space-y-2">
                            <Label htmlFor='transcription_prompt'>Transcription Prompt</Label>
                            <Textarea 
                                id='transcription_prompt' 
                                className='h-20 leading-relaxed resize-none'
                                placeholder='Add keyworks mencioned in video diving per common (,)'
                            />
                        </div>

                        <Button type='submit' className='w-full'>
                            Load Video
                            <Upload className='w-4 h-4 ml-2'/>
                        </Button>
                    </form>

                    <Separator/>
                    <form className="space-y-8 w-full">
                        <Label htmlFor="type">
                            Prompt
                        </Label>

                        <Select defaultValue="video_description">
                            <SelectTrigger className="">
                                <SelectValue placeholder="Select a prompt" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
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
                                defaultValue={[0.5]}
                            />
                            <span className='block text-xs text-muted-foreground italic leading-relaxed'>High values can apper some errors</span>
                        </div>

                        <Separator />

                        <Button type='submit' className='w-full'>
                            Execute
                            <Wand2 className='w-4 h-4 ml-2'/>
                        </Button>
                    </form>
                </aside>
            </main>
        </>
    )
}