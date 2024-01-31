import "@testing-library/jest-dom"
import { typesOfScores } from "@/utils";


describe("typesOfScores tests", function () {
    it("Should not have key arrays with 0 args", function () {
        const typesOfScoresArray = Object.values(typesOfScores)

        typesOfScoresArray.forEach(arr => {
            expect(arr.length).toBeGreaterThan(0)
        })
    })
})