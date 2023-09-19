"use client"

import { Github } from 'lucide-react' 
import { Button } from "@/components/ui/button"
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import {useTheme} from 'next-themes'
import Icons from '../Icons'

export default function Header(){
    const {theme, setTheme} = useTheme();

    const toggleTheme = () => theme == 'dark' ? setTheme('light') : setTheme('dark');
    
    return (
        <>
            <header className="flex justify-between px-16 pt-8 pb-4 border-b-2 border-purple-950 max-sm:p-4">
                <Link href={'/'} className="text-lg self-center">
                    TechVideo.AI
                </Link>
                <div className='flex items-center gap-4'>
                    <span onClick={toggleTheme}>
                        <Icons iconName={theme === "light" ? "moon" : "sun"} size={20} overrideClass addClass='inline' />
                    </span>
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