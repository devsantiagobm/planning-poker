import { ComponentProps } from "react"

interface Props extends ComponentProps<"input"> {
    label: string
    name: string
    value: string
}

export default function InputRadioAtom({ label, name, value, ...props }: Props) {
    return (
        <label className="input-radio" data-testid="label-input-radio">
            <span className="input-radio__label">{label}</span>
            <input type="radio" value={value} name={name} {...props} hidden data-testid="input-radio-input" aria-label={value}/>
            <span className="input-radio__input"></span>
        </label>
    )
}