import { validateGenericInput } from "@/helpers";


describe("validateGenericInput Tests", function () {

    it("Should be false if the input is right", function () {
        const value = "santiago"
        expect(validateGenericInput(value)).toBe(false)
    })

    it("Should be false if the input has maximum 3 numbers", function () {
        const value = "santiago123"
        expect(validateGenericInput(value)).toBe(false)
    })

    it("Should be true if the input has a special character", function () {
        const value = "santiago."
        expect(validateGenericInput(value)).toBe(true)
    })

    it("Should be true if the input has more than 3 numbers", function () {
        const value = "santiago1234"
        expect(validateGenericInput(value)).toBe(true)
    })

    it("Should be true if the input only has numbers", function () {
        const value = "12345"
        expect(validateGenericInput(value)).toBe(true)
    })

    it("Should be true if the input has less than 4 letters or more than 20", function () {
        const greatValue = "santiago-barrera-muñoz-123"
        const shortValue = "san"
        expect(validateGenericInput(greatValue)).toBe(true)
        expect(validateGenericInput(shortValue)).toBe(true)
    })

    it("Should be true if the input is empty", function () {
        const value = ""
        expect(validateGenericInput(value)).toBe(true)
    })

    it("Should be true if the input contains only whitespace", function () {
        const value = "            "
        expect(validateGenericInput(value)).toBe(true)
    })

    it("Should be true if the input contains a normal text with multiple whitespace together", function () {
        const value = "santiago  barrera"
        expect(validateGenericInput(value)).toBe(true)
    })
})