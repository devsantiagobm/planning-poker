// WITHOUT THIS LINE, THE TESTS ARE SHOWING AN ERROR 
window.setImmediate = window.setTimeout as any

jest.mock("socket.io-client", () => ({
    io: () => ({
        id: "my-socket-id",
        emit: jest.fn()
    })
}))


import { UpdateUserModal } from "@/app/classroom/[id]/components";
import { useClassroomContext, useUserContext } from "@/app/classroom/[id]/hooks/";
import { act, fireEvent, render, renderHook, screen, waitFor } from "@testing-library/react";
import { CreateWrapperContexts, RenderHookContexts } from "../../../../test-utils";



const setModal = jest.fn()
const setTypeOfPlayer = jest.fn()

jest.mock("../../../../../src/app/classroom/[id]/hooks/useUserContext", () => ({
    useUserContext: () => ({
        ...jest.requireActual("../../../../../src/app/classroom/[id]/hooks/useUserContext").useUserContext(),
        setTypeOfPlayer
    })
}));

describe('<UpdateUserModal/> tests', () => {

    let result: RenderHookContexts;

    beforeEach(() => {

        const hook = renderHook(() => ({
            classroom: useClassroomContext(),
            user: useUserContext()
        }), { wrapper: CreateWrapperContexts(<UpdateUserModal setModal={setModal} />) })

        result = hook.result


        jest.clearAllMocks()
    })


    it('Should render the basic without crashing', () => {
        expect(screen.getByText("Cambiar modo de visualización")).toBeInTheDocument()
        expect(screen.getByLabelText("Jugador")).toBeInTheDocument()
        expect(screen.getByLabelText("Espectador")).toBeInTheDocument()
        expect(screen.getByRole("button", { name: "button-close" })).toBeInTheDocument()
    });


    it("Should allow check the input radios after click them", function () {
        const playerRadio = screen.getByLabelText("Jugador")
        const viewerRadio = screen.getByLabelText("Espectador")


        fireEvent.click(playerRadio)
        expect(playerRadio).toBeChecked()
        expect(viewerRadio).not.toBeChecked()
        expect(viewerRadio).not.toBeChecked()


        fireEvent.click(viewerRadio)
        expect(viewerRadio).toBeChecked()
        expect(playerRadio).not.toBeChecked()
    })


    it("Should execute the functions inside the onsubmit function", async function () {
        fireEvent.click(screen.getByLabelText("Espectador"))
        expect(screen.getByLabelText("Espectador")).toBeChecked()

        await act(async () => {
            fireEvent.submit(screen.getByRole("form"))
        })

        await waitFor(async () => {
            expect(setModal).toHaveBeenCalledWith(null)
            expect(setTypeOfPlayer).toHaveBeenCalledWith("viewer")
            expect(result.current.classroom.socket.emit).toHaveBeenCalledWith("update-player", { type: "viewer" })
        })
    })


    it("Should execute setModal after click the close button", function () {
        expect(setModal).toHaveBeenCalledTimes(0)

        fireEvent.click(screen.getByRole("button", { name: "button-close" }))

        expect(setModal).toHaveBeenCalledTimes(1)
        expect(setModal).toHaveBeenCalledWith(null)
    })
});