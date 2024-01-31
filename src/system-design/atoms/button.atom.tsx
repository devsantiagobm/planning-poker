import { ComponentProps } from "react"


interface Props extends ComponentProps<"button"> {
    variant: "primary" | "secondary" | "third",
    isActive?: boolean
}


export const variants: { [key in Props['variant']]: string } = {
    "primary": "button__primary",
    "secondary": "button__secondary",
    "third": "button__third",
}

export default function ButtonAtom({ children, variant, className, isActive = true, ...props }: Props) {
    return (
        <button className={`button ${!isActive && "button--disabled"} ${className} ${variants[variant]}`} {...props}>{children}</button>
    )
}