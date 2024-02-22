// WITHOUT THIS LINE, THE TESTS ARE SHOWING AN ERROR 
window.setImmediate = window.setTimeout as any

jest.mock("socket.io-client", () => ({
    io: () => ({
        id: "my-socket-id",
        emit: jest.fn(),
        on: jest.fn(),
        disconnect: jest.fn()
    })
}))



import Classroom from "@/app/classroom/[id]/page";
import { render, renderHook, waitFor } from "@testing-library/react";
import { useClassroomContext } from "../../../../src/app/classroom/[id]/hooks/useClassroomContext";
import { CreateWrapperContexts } from "../../../test-utils";
import { ClassroomContent } from "@/app/classroom/[id]/components";

describe('Classroom component', () => {
    it('Should render without crashing', async () => {
        render(<Classroom params={{ id: "id" }} />);
    });

    it("Should execute the socket.on after the render of the component", async function () {
        const { result } = renderHook(() => useClassroomContext(), { wrapper: CreateWrapperContexts(<ClassroomContent params={{ id: "example" }} />) })

        await waitFor(async () => {
            const { on } = result.current.socket

            expect(on).toHaveBeenCalledWith("join-classroom", expect.any(Function))
            expect(on).toHaveBeenCalledWith("update-classroom", expect.any(Function))
            expect(on).toHaveBeenCalledWith("add-admin", expect.any(Function))
            expect(on).toHaveBeenCalledWith("reveal-cards", expect.any(Function))
            expect(on).toHaveBeenCalledWith("reset-classroom", expect.any(Function))
            expect(on).toHaveBeenCalledWith("update-player", expect.any(Function))
            expect(on).toHaveBeenCalledWith("change-type-of-score", expect.any(Function))
            expect(on).toHaveBeenCalledWith("match-full", expect.any(Function))
        })
    })
});