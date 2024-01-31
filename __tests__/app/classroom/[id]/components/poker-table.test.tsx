
// WITHOUT THIS LINE, THE TESTS ARE SHOWING AN ERROR 
window.setImmediate = window.setTimeout as any


const socketID = "my-socket-id"

jest.mock("socket.io-client", () => ({
    io: () => ({
        id: "my-socket-id",
        emit: jest.fn()
    })
}))

import { PokerTable } from "@/app/classroom/[id]/components";
import { useClassroomContext, useUserContext } from "@/app/classroom/[id]/hooks";
import { fireEvent, renderHook } from "@testing-library/react";
import { CreateWrapperContexts, RenderHookContexts } from "../../../../test-utils";
import { screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { FullPlayer } from "@/types";


describe("<PokerTable> tests", function () {
    let result: RenderHookContexts;

    beforeEach(() => {
        const hook = renderHook(() => ({
            classroom: useClassroomContext(),
            user: useUserContext(),
        }), { wrapper: CreateWrapperContexts(<PokerTable />) })

        result = hook.result
    })

    it("Should render the default component without users and with the table", function () {
        expect(screen.getByTestId("poker-desk")).toBeInTheDocument()
        expect(screen.queryAllByRole("button").length).toBe(0)
    })

    it("Should render the component with one user", function () {
        const players: FullPlayer[] = [{
            _id: "random",
            roomID: "roomID",
            socketID: "socketID",
            type: "player",
            username: "username",
        }]

        act(() => {
            result.current.classroom.setPlayers(players)
        })

        expect(screen.getByTestId("poker-desk")).toBeInTheDocument()
        expect(screen.queryAllByRole("button").length).toBe(players.length)
        expect(screen.getByText(players[0].username).textContent).toBe(players[0].username)
    })

    it("Should render the component with one user of type player and another of type viewer", function () {
        const users: FullPlayer[] = [
            {
                _id: "random-1",
                roomID: "roomID",
                socketID: "socketID-1",
                type: "player",
                username: "username-player"
            },
            {
                _id: "random-2",
                roomID: "roomID",
                socketID: "socketID-2",
                type: "viewer",
                username: "username-viewer"
            },
        ]

        act(() => {
            result.current.classroom.setPlayers(users)
        })


        expect(screen.getByTestId("card")).toBeInTheDocument()
        expect(screen.getByTestId("letter-avatar")).toBeInTheDocument()
        expect(screen.getByText(users[0].username).textContent).toBe(users[0].username)
        expect(screen.getByText(users[1].username).textContent).toBe(users[1].username)
    })


    it("Should render the component with one card with vote and another without vote", async function () {
        const users: FullPlayer[] = [
            {
                _id: "random-1",
                roomID: "roomID",
                socketID: "socketID-1",
                type: "player",
                username: "player 1"
            },
            {
                _id: "random-2",
                roomID: "roomID",
                socketID: "socketID-2",
                type: "player",
                username: "player 2",
                vote: "123"
            },
        ]

        await act(async () => {
            result.current.classroom.setPlayers(users)
        })

        expect(screen.getAllByTestId("card")[0]).not.toHaveClass("classroom__player-card--voted")
        expect(screen.getAllByTestId("card")[1]).toHaveClass("classroom__player-card--voted")
    })



    it("Should show the reveal cards button if all user already have voted", async function () {
        const users: FullPlayer[] = [
            {
                _id: "random-1",
                roomID: "roomID",
                socketID: "socketID-1",
                type: "player",
                username: "player 1",
                vote: "123"
            },
            {
                _id: "random-2",
                roomID: "roomID",
                socketID: "socketID-2",
                type: "player",
                username: "player 2",
                vote: "123"
            }
        ]

        await act(async () => {
            result.current.classroom.setPlayers(users)
            result.current.classroom.setOwners([socketID])
        })


        expect(screen.getByText("Revelar cartas")).toBeInTheDocument()
        fireEvent.click(screen.getByText("Revelar cartas"))
        expect(result.current.classroom.socket.emit).toHaveBeenCalledWith("reveal-cards")
    })

    it("Should show the reset button if user is owner and averagevotes is truthy", async function () {
        await act(async () => {
            result.current.classroom.setOwners([socketID])
            result.current.classroom.setAverageVotes("123")
        })


        expect(screen.getByText("Nueva votación")).toBeInTheDocument()
        fireEvent.click(screen.getByText("Nueva votación"))

        expect(result.current.classroom.socket.emit).toHaveBeenCalledWith("reset-classroom")
    })
})