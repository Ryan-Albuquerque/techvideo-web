"use client"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { FileVideo, Upload, Wand2 } from "lucide-react"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { ChangeEvent, FormEvent, useRef, useState } from "react"
import { FFmpeg } from '@ffmpeg/ffmpeg'
import { fetchFile, toBlobURL } from '@ffmpeg/util'
import { api } from "@/lib/api"

export default function YoutubeResourceCreator() {
    const promptRef = useRef(null)

    const [videoFile, setVideoFile] = useState<string>()
    const [videoId, setVideoId] = useState<string>()
    const [temperature, setTemperature] = useState<number>()
    const [videoPrompt, setVideoPrompt] = useState<string | null>()
    const [completion, setCompletion] = useState<string>()
    const [transcriptionPromptTextArea, setTranscriptionPromptTextArea] = useState<string>()

    const handleFileSelected = (event: ChangeEvent<HTMLInputElement>) => {
        const { files } = event.currentTarget

        if (!files) {
            return
        }

        files[0] && setVideoFile(URL.createObjectURL(files[0]))
    }

    const handleUploadVideo = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        if(!videoFile) return

        const audioFile = await convertVideoToAudio(videoFile)

        const data = new FormData()

        data.append('file', audioFile)

        const response = await api.post('/videos', data)

        const videoId = response.data.video.id

        await api.post(`/videos/${videoId}/transcription`, {
            transcriptionPromptTextArea,
        })

        setVideoId(videoId)
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const result = await api.post("/complete", {
            videoId,
            temperature,
            videoPrompt
        })

        setCompletion(result.data.completion)
    }

    const handleVideoPrompt = async (option: string) => {
        setVideoPrompt(option)
        const prompt = promptRef?.current

        option !== 'customize' ? prompt.readOnly = true : prompt.readOnly = false
    }

    const convertVideoToAudio = async (videoFile: string) => {
        const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.2/dist/umd'
        const ffmpeg = new FFmpeg()
        await ffmpeg.load({
            coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
            wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
        });
        await ffmpeg.writeFile('input.mp4', await fetchFile(videoFile))
        
        
        ffmpeg.on('progress', progress => {
            console.log('Convert progress: ' + Math.round(progress.progress * 100))
        })
    
        await ffmpeg.exec([
            '-i',
            'input.mp4',
            'output.mp3'
        ])


        const data = await ffmpeg.readFile('output.mp3')

        const audioFileBlob = new Blob([data], { type: 'audio/mp3' })
        const audioFile = new File([audioFileBlob], 'output.mp3', {
          type: 'audio/mpeg'
        })
    
        console.log('Convert finished.')
    
        return audioFile
    }
    
    return(
        <>
            <main className="flex-1 flex min-h-screen">
                <section className="flex flex-col flex-1 gap-4">
                    <div className="flex flex-col gap-4 p-5 flex-1">
                        <Textarea
                            placeholder="Add Prompt command."
                            className="resize-none h-1/2 leading-relaxed"
                            ref={promptRef}
                        />
                        <Textarea
                            placeholder="Result"
                            readOnly
                            className="resize-none h-1/2 leading-relaxed"
                            value={completion}
                        />
                    </div>
                </section>
                <aside className="w-1/4 max-lg:w-1/3 max-sm:w-5/12 max-sm:px-2 flex flex-col space-y-8 p-5">
                    <form className='w-full space-y-6' onSubmit={handleUploadVideo}>
                        <p className="text-center mt-2 max-lg:text-xs">First of all upload your video to generate a transcription</p>
                        <label 
                            htmlFor="video"
                            className='border flex rounded-md aspect-video cursor-pointer border-dashed text-sm flex-col gap-2 items-center justify-center text-muted-foreground hover:bg-primary/5 my-4'
                        >
                            {!videoFile ? (
                                <>
                                    <FileVideo className='w-4 h-4'/>
                                    Upload a video 
                                </> ) : (
                                <>
                                    <video src={videoFile} />
                                </>
                            )}
                        </label>
                        <input type="file" id="video" accept='video/mp4' className='sr-only' onChange={handleFileSelected}/>

                        <div className="space-y-2">
                            <Label htmlFor='transcription_prompt'>Transcription Prompt</Label>
                            <Textarea 
                                id='transcription_prompt' 
                                className='h-20 leading-relaxed resize-none'
                                placeholder='Add keyworks mencioned in video diving per common (,)'
                                onChange={(e) => setTranscriptionPromptTextArea(e.target.value)}
                            />
                        </div>

                        <Button type='submit' className='w-full'>
                            Load Video
                            <Upload className='w-4 h-4 ml-2'/>
                        </Button>
                    </form>

                    <Separator/>
                    <form className="space-y-8 w-full" onSubmit={handleSubmit}>
                        <Label htmlFor="type">
                            Prompt
                        </Label>

                        <Select defaultValue="customize" onValueChange={handleVideoPrompt}>
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
                                defaultValue={[0.5]}
                                onValueChange={value => setTemperature(value[0])}
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