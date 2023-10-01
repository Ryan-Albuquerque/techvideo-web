"use client"

import Icons from "@/components/common/Icons";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea"
import { api } from "@/lib/api";
import { NotificationTypeEnum } from "@/utils/enum/NotificationTypeEnum";
import { StatusToButtonEnum } from "@/utils/enum/StatusToButtonEnum";
import Notification from "@/utils/notification";
import { FormEvent, useState } from "react";

export default function AskMe() {
    let temperature = 0.5;
    
    const [status, setStatus] = useState<StatusToButtonEnum>(StatusToButtonEnum.DISABLED)
    const [promptValue,setPromptValue] = useState<string>()
    const [result,setResult] = useState<string>("")

    const handlePromptValue = (e: React.FocusEvent<HTMLTextAreaElement>) => {
        setPromptValue(e.target.value)
        setStatus(StatusToButtonEnum.READ)
    }

    const handleSubmitPrompt = async (event: FormEvent<HTMLFormElement>) => {
        try {            
            event.preventDefault();
    
            setStatus(StatusToButtonEnum.LOADING)
            
            const {data} = await api.post(`/ask-me`, {prompt: promptValue, temperature})

            setResult(data)

            setStatus(StatusToButtonEnum.DONE)            
            Notification(NotificationTypeEnum.success, 'Result Generated!')            
        } catch (error: any) {           
            setStatus(StatusToButtonEnum.READ)
            Notification(NotificationTypeEnum.error, `Something wrong - ${error?.response?.data?.error ?? error?.message}`)
        }
    };

    return (
        <>
            <main className="flex-1 flex min-h-screen max-sm:flex-col">
                <form className=" max-sm:px-2 flex flex-col flex-1 space-y-8 p-5 max-sm:flex-none" onSubmit={handleSubmitPrompt}>
                    <Textarea
                        placeholder={"Add Prompt command." + "\n" + "Egg.: What do I have to know about next.js?"}
                        className="resize-none h-1/2 leading-relaxed max-md:text-xs min-h-[300px]"
                        onBlur={handlePromptValue}
                    />
                    <div className="flex justify-between items-center">
                        <div className="flex flex-col basis-3/4 space-y-2 gap-3">
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
                        <div className="basis-1/4 h-4/6 m-4 max-sm:m-2">
                            <Button className="w-full h-full gap-2" type="submit" disabled={status == StatusToButtonEnum.DISABLED || !promptValue}>
                            {status !== StatusToButtonEnum.LOADING ? 
                                <>
                                    <Icons iconName="send" addClass="w-4 h-4" overrideClass/>
                                    Send
                                </> :
                                <>
                                    <svg aria-hidden="true" className="w-8 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 dark:fill-blue-50 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                    </svg>
                                    <p className="max-md:text-xs">Loading</p>  
                                </>}
                            </Button>
                        </div>
                    </div>

                    <Separator/>    
                </form>
                
                <div className=" max-sm:px-2 flex flex-col flex-1 space-y-8 p-5">
                    <Textarea
                        placeholder="Result"
                        readOnly
                        className="resize-none h-1/2 leading-relaxed max-md:text-xs min-h-[300px]"
                        value={result}
                    />
                </div>
            </main>
        </>
    )
}