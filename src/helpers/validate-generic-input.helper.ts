

export function validateGenericInput(value: string) {
    const regex = /^(?=.*[a-zA-Z])(?!.*[^a-zA-Z0-9 ]).{5,20}(?:.*\d){0,3}$/
    const lessThan3Numbers = value.split("").filter(l => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(Number(l))).length <= 3
    const hasConsecutiveSpaces = /\s{2,}/.test(value);

    return !lessThan3Numbers || !regex.test(value) || hasConsecutiveSpaces;
}