import { TwoLetterString } from "@/types"
import { ComponentProps } from "react"

interface Props extends ComponentProps<"span"> {
    letters: TwoLetterString | "";
    variant?: "small" | "big"
}

export default function LetterAvatar({ letters, variant = "small", className, ...props }: Props) {
    return (
        <span className={`letter-avatar ${className} ${variant === "big" && "letter-avatar__big"}`} {...props} data-testid="letter-avatar">{letters}</span>
    )
}