import { ComponentProps } from "react";

interface Props extends ComponentProps<"div"> { }

export default function RadioGroupMolecule({ children, className, ...props }: Props) {
    return (
        <div className={"radio-group " + className} data-testid="radio-group" {...props}>
            {children}
        </div>
    )
}