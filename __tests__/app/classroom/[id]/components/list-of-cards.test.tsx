// WITHOUT THIS LINE, THE TESTS ARE SHOWING AN ERROR 
window.setImmediate = window.setTimeout as any


jest.mock("socket.io-client", () => ({
    io: () => ({
        id: "my-socket-id",
        emit: jest.fn(),
        on: jest.fn()
    })
}))

import { act, fireEvent, renderHook, screen, waitFor } from "@testing-library/react";
import { useClassroomContext, useUserContext } from "@/app/classroom/[id]/hooks";
import { CreateWrapperContexts, RenderHookContexts } from "../../../../test-utils";
import { typesOfScores } from "@/utils";
import { Cards } from "@/app/classroom/[id]/components";




describe("<Cards /> tests", function () {
    let result: RenderHookContexts;

    beforeEach(() => {
        const { result: resultLocal } = renderHook(() => ({
            classroom: useClassroomContext(),
            user: useUserContext()
        }), {
            wrapper: CreateWrapperContexts(<Cards />)
        })
        result = resultLocal

        // jest.clearAllMocks
    })

    it("Should render the cards if globalTypeOfScores is not null and type of player is equal to player", function () {
        const typeOfScoreSelected = "fibonacci"

        act(() => {
            result.current.classroom.setGlobalTypeOfScores(typeOfScoreSelected)
            result.current.user.setTypeOfPlayer("player")
        })

        expect(screen.getByText("Elige una carta 👇")).toBeInTheDocument()

        typesOfScores[typeOfScoreSelected].forEach(score => {
            expect(screen.getByRole("button", { name: score })).toBeInTheDocument()
        })

    })


    it("Should not render the cards or the title if globalTypeOfScores is null", function () {
        act(() => {
            result.current.classroom.setGlobalTypeOfScores(null as any)
        })

        expect(screen.queryByText("Elige una carta 👇")).not.toBeInTheDocument()
        expect(screen.queryByText("button")).not.toBeInTheDocument()
    })

    it("Should render the selected cards based in the globalTypeOfScores state", function () {
        act(() => {
            result.current.classroom.setGlobalTypeOfScores("fibonacci")
        })

        typesOfScores.fibonacci.forEach(score => {
            expect(screen.getByRole("button", { name: score })).toBeInTheDocument()
        })

        act(() => {
            result.current.classroom.setGlobalTypeOfScores("lineal")
        })

        typesOfScores.lineal.forEach(score => {
            expect(screen.getByRole("button", { name: score })).toBeInTheDocument()
        })
    })

    it("Should render the selected cards based in the globalTypeOfScores state", function () {
        act(() => {
            result.current.classroom.setGlobalTypeOfScores("fibonacci")
        })

        typesOfScores.fibonacci.forEach(score => {
            expect(screen.getByRole("button", { name: score })).toBeInTheDocument()
        })

        act(() => {
            result.current.classroom.setGlobalTypeOfScores("lineal")
        })

        typesOfScores.lineal.forEach(score => {
            expect(screen.getByRole("button", { name: score })).toBeInTheDocument()
        })
    })


    it("Should appear the initial box with opacity 0 and then transition to opacity 1", async function () {
        act(() => {
            result.current.classroom.setGlobalTypeOfScores("fibonacci")
        })


        expect(screen.getByTestId("list-of-cards")).toBeInTheDocument()
        expect(screen.getByTestId("list-of-cards")).toHaveStyle({ opacity: 0 })

        await waitFor(() => {
            expect(screen.getByTestId("list-of-cards")).toHaveStyle({ opacity: 1 })
        })
    })


    it("Should execute socket.emit if user voted a card", async function () {
        await act(async () => {
            fireEvent.click(screen.getByRole("button", { name: "☕" }))
        })

        expect(result.current.classroom.socket.emit).toHaveBeenCalledWith("vote", { card: "☕" })
    })

    it("Should execute socket.on in the render of the component", async function () {
        await waitFor(async () => { 
            expect(result.current.classroom.socket.on).toHaveBeenCalledWith("reset-classroom", expect.any(Function))
            expect(result.current.classroom.socket.on).toHaveBeenCalledWith("change-type-of-score", expect.any(Function))
        })
    })

})