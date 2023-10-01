import Link from "next/link";
import { Button } from "@/components/ui/button";
import Icons from "../Icons";

interface IHubCard {
    linkTo: string, 
    icon: string,
    name: string, 
    headerDescription?: string,
    bodyDescription?: string
    footerDescription?: string
    hasHoverContent: boolean
}


export default function HubCard ({linkTo, icon, name, headerDescription, bodyDescription, footerDescription, hasHoverContent = false} : IHubCard) {    
    return(
        <>
            <Link href={linkTo} passHref legacyBehavior>
                    <div className="relative group">
                        <Button className="group-hover:opacity-20 max-sm:h-5/6 w-full h-full pt-2 shadow-lg shadow-purple-950 bg-purple-950 flex flex-col">
                            <Icons iconName={icon}/>
                            {name}
                        </Button> 
                        {hasHoverContent && 
                        <>
                            <div className="group-hover:visible group-hover:opacity-100 absolute top-0 bottom-0 left-0 right-0 opacity-0 flex my-2 flex-col text-[10px] text-center font-bold transition-opacity ease-in duration-200 cursor-pointer">
                                <p>{headerDescription ? headerDescription : `As ${name} you can:` }</p>
                                <br/>
                                <ul className="mx-2">
                                    {
                                        bodyDescription?.split("-")?.map(
                                            (desc: string, i : number) =>{ 
                                                return <li key={i}>&#8226; {desc}</li>
                                            }
                                        )
                                    }
                                </ul>
                                <br/>  
                                <p>{footerDescription}</p>
                            </div>
                        </>
                        }
                        
                    </div>
                </Link>
        </>
    );
}