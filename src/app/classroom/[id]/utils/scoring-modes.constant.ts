import { TypeOfScores } from "@/types"

interface RadiosValues {
    label: string
    name: "typeOfScores"
    value: TypeOfScores
}

export const inputName = "typeOfScores"


export const scoringModesElements: RadiosValues[] = [
    {
        label: "Fibonacci",
        name: inputName,
        value: "fibonacci"
    },
    {
        label: "Lineal",
        name: inputName,
        value: "lineal"
    },
    {
        label: "Potencias de dos",
        name: inputName,
        value: "power-of-two"
    }
]