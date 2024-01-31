import { ComponentProps } from "react"


interface CardProps extends ComponentProps<"button"> {
    variant?: "small" | "big"
}

export default function Card({ children, className, variant, ...props }: CardProps) {
    return <button className={`card ${className} ${variant === "big" && "card--big"}`} {...props} data-testid="card">{children}</button>;
}

