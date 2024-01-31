import { getFirstLetters } from "@/app/classroom/[id]/utils";

describe("getFirstLetters tests", function () {
    it("Should return two letters uppercase", function () {
        expect(getFirstLetters("santiago")).toBe("SA")
    })

    it("Should return an empty string", function () {
        expect(getFirstLetters("")).toBe("")
    })

    it('Should return uppercase single letter for a one-letter name', () => {
        expect(getFirstLetters('A')).toBe('A');
    });

    it('Should return an empty string for a null name', () => {
        expect(getFirstLetters(null as any)).toBe('');
    });

    it('Should return an empty string for an undefined name', () => {
        expect(getFirstLetters(undefined as any)).toBe('');
    });

})