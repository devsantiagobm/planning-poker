import { ComponentProps } from "react"

interface Props extends ComponentProps<"input"> {
    label?: string
    id: string
}

export default function InputAtom({ label, id, className, ...props }: Props) {
    return (
        <div className="input">
            {label && <label htmlFor={id} className="input__label">{label}</label>}
            <input type="text" id={id} name={id} autoComplete="off" {...props} className={`input__textbox ${className}`} />        
        </div>
    )
}