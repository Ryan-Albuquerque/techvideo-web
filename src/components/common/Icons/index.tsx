import dynamicIconImports from "lucide-react/dynamicIconImports";
import dynamic from "next/dynamic";

interface IIconsProps {
    iconName: string,
    size?: number,
    overrideClass?: boolean
    addClass?: string
}

export default function Icons ({iconName, overrideClass, addClass, size = 70}: IIconsProps) {
    const defaultClass = 'mb-6 mt-1 max-sm:h-1/3';
    const clazz = overrideClass ? addClass : `${defaultClass} ${addClass}`

    const Icon = dynamic(dynamicIconImports[iconName as keyof typeof dynamicIconImports])

    return (
        <Icon size={size} className={clazz}/>
    )
}