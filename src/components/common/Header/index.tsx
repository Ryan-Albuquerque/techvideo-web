import { Github } from 'lucide-react' 
import { Button } from "@/components/ui/button"
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'


export default function Header(){
    return (
        <>
            <header className="flex justify-between px-16 pt-8 pb-4 border-b-2 border-purple-950 max-sm:p-4">
                <Link href={'/'} className="text-lg self-center">
                    TechVideo.AI   
                </Link>
                <div className='flex items-center gap-4'>
                    <h6 className='text-muted-foreground text-sm max-sm:hidden'>Developed by ryan-albuquerque</h6>
                    <Separator orientation='vertical' className="h-6 max-sm:hidden"/>
                    <Link href="https://www.github.com/ryan-albuquerque" passHref legacyBehavior>
                        <Button variant="outline" >
                            <Github className='w-4 h-4 mr-2'/>
                            Github
                        </Button>
                    </Link>
                </div>
            </header>
        </>
    )
}