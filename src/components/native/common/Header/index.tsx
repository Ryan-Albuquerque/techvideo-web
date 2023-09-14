import { Github } from 'lucide-react' 
import { Button } from "@/components/ui/button"
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'


export default function Header(){
    return (
        <>
            <div className="flex justify-between px-16 pt-8 pb-4 border-b-2 border-purple-950 max-sm:p-4">
                <h1 className="text-lg self-center">
                    TechVideo.AI
                </h1>   
                <div className='flex items-center gap-4'>
                    <h6 className='text-muted-foreground text-sm max-sm:hidden'>Developed by ryan-albuquerque</h6>
                    <Separator orientation='vertical' className="h-6 max-sm:hidden"/>
                    <Button variant="outline" >
                        <Github className='w-4 h-4 mr-2'/>
                        <Link href="https://www.github.com/ryan-albuquerque">Github</Link>
                    </Button>
                </div>
            </div>
        </>
    )
}2