import { TwoLetterString } from "@/types"

export function getFirstLetters(username: string) {
    if (!username || username.length === 0) {
        return "";
    }

    const firstLetter = username[0]
    const secondLetter = username[1] ?? ""
    return (firstLetter + secondLetter).toUpperCase() as TwoLetterString
}

