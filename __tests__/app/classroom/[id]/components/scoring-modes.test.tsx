// WITHOUT THIS LINE, THE TESTS ARE SHOWING AN ERROR 
window.setImmediate = window.setTimeout as any


import { ScoringModes } from "@/app/classroom/[id]/components";
import { useClassroomContext, useUserContext } from "@/app/classroom/[id]/hooks";
import { fireEvent, renderHook, waitFor } from "@testing-library/react";
import { CreateWrapperContexts, RenderHookContexts } from "../../../../test-utils";
import { screen } from "@testing-library/react";
import { scoringModesElements } from "@/app/classroom/[id]/utils";

jest.mock("socket.io-client", () => ({
    io: () => ({
        id: "my-socket-id",
        emit: jest.fn()
    })
}))

describe("<ScoringModes/> tests", function () {

    let result: RenderHookContexts;

    const setModal = jest.fn()

    beforeEach(() => {
        const hook = renderHook(() => ({
            classroom: useClassroomContext(),
            user: useUserContext(),
        }), { wrapper: CreateWrapperContexts(<ScoringModes setModal={setModal} />) })

        result = hook.result
    })

    it("Should render the component with its basic info", function () {
        expect(screen.getByText("Tipo de puntajes")).toBeInTheDocument()
        expect(screen.getByAltText("Close icon")).toBeInTheDocument()
        expect(screen.getByText("Cambiar puntajes")).toBeInTheDocument()

        scoringModesElements.forEach(({ label, value }) => {
            expect(screen.getByLabelText(label)).toBeInTheDocument()
            expect(screen.getByLabelText(label)).toHaveAttribute("value", value)
        })
    })

    it("Should execute the setModal and socket.emit functions in submit event", async function () {
        fireEvent.submit(screen.getByRole("form"))

        await waitFor(async () => {
            expect(setModal).toHaveBeenCalled()
            expect(result.current.classroom.socket.emit).toHaveBeenCalledWith("change-type-of-score", expect.anything())
        })
    })
})
