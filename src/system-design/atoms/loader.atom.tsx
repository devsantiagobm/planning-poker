
import { ComponentProps } from "react"

export default function Loader({ children, className, ...props }: ComponentProps<"span">) {
    const classNames = className ? className + " loader" : "loader";

    return (
        <span className={classNames} {...props} data-testid="loader"></span>
    )
}