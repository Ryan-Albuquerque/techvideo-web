import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Icons from "../Icons";
import { api } from "@/lib/api";
import { ChangeEvent, FormEvent, useState } from "react";
import {StatusUploadVideoEnum} from '@/utils/enum/StatusUploadVideoEnum'
import ffmpegResource from "@/utils/resources/FFmpegResource";


interface ICreatorVideoUploadForm {
    setId: Function,
    setUploadStatus: Function, 
    uploadStatus: StatusUploadVideoEnum
}

export default function CreatorVideoUploadForm({setId, setUploadStatus, uploadStatus}: ICreatorVideoUploadForm) {

    const [videoFile, setVideoFile] = useState<string>()
    const [transcriptionPromptTextArea, setTranscriptionPromptTextArea] = useState<string>()

    const handleFileSelected = (event: ChangeEvent<HTMLInputElement>) => {
        const { files } = event.currentTarget

        if (!files) {
            return
        }

        files[0] && setVideoFile(URL.createObjectURL(files[0]))
        
        setUploadStatus(StatusUploadVideoEnum.READ)
    }

    const handleUploadVideo = async (event: FormEvent<HTMLFormElement>) => {
        try {
            
            event.preventDefault();
    
            setUploadStatus(StatusUploadVideoEnum.LOADING)
            
            if(!videoFile) return
    
            const audioFile = await ffmpegResource.convertVideoToAudio(videoFile)
    
            const data = new FormData()
    
            data.append('file', audioFile)
    
            const response = await api.post('/videos', data)
    
            const videoId = response.data.video.id
    
            await api.post(`/videos/${videoId}/transcription`, {
                transcriptionPromptTextArea,
            })
            setId(videoId)

            setUploadStatus(StatusUploadVideoEnum.DONE)
            
        } catch (error: any) {
            console.log(error?.message);
            
            setUploadStatus(StatusUploadVideoEnum.READ)
        }
    }

    
    return (
        <>
            <form className='w-full space-y-6' onSubmit={handleUploadVideo}>
                <p className="text-center mt-2 max-lg:text-xs">First of all upload your video to generate a transcription, after generate your AI content</p>
                <Label 
                    htmlFor="video"
                    className='border flex rounded-md aspect-video cursor-pointer border-dashed text-sm flex-col gap-2 items-center justify-center text-muted-foreground hover:bg-primary/5 my-4'
                >
                    {!videoFile ? (
                        <>
                            <Icons iconName="filevideo" addClass="w-4 h-4" overrideClass/>
                            Upload a video 
                        </> ) : (
                        <>
                            <video src={videoFile} className="aspect-video"/>
                        </>
                    )}
                </Label>
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

                <Button type='submit' className='w-full' disabled={uploadStatus == StatusUploadVideoEnum.DISABLED}>
                    {uploadStatus !== StatusUploadVideoEnum.LOADING ? 
                        <>
                            <Icons iconName="upload" addClass="w-4 h-4 mx-2" overrideClass /> 
                            Upload Video
                        </> : 
                        <>
                            <svg aria-hidden="true" className="w-8 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 dark:fill-blue-50 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                            </svg>
                            Loading
                        </>
                    }
                </Button>
            </form>
        </>
    )
}