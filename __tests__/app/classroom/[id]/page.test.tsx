// WITHOUT THIS LINE, THE TESTS ARE SHOWING AN ERROR 
window.setImmediate = window.setTimeout as any


import Classroom from "@/app/classroom/[id]/page";
import { render } from "@testing-library/react";
import { useClassroomContext } from "../../../../src/app/classroom/[id]/hooks/useClassroomContext";
import { type ClassroomContext } from "@/app/classroom/[id]/types";


jest.mock("../../../../src/app/classroom/[id]/hooks/useClassroomContext", () => ({
    useClassroomContext: jest.fn(function (): ClassroomContext {
        return {
            isUserCreated: true,
            setIsUserCreated: jest.fn(),
            socket: {
                on: jest.fn(),
                disconnect: jest.fn()
            } as any,
            classroomName: "classroom",
            setClassroomName: jest.fn(),
            players: [],
            setPlayers: jest.fn(),
            averageVotes: null,
            setAverageVotes: jest.fn(),
            amountOfVotes: null,
            setAmountOfVotes: jest.fn(),
            owners: [],
            isOwner: false,
            setOwners: jest.fn(),
            arePlayersReady: false,
            globalTypeOfScores: "fibonacci",
            setGlobalTypeOfScores: jest.fn(),
            fullMatch: false,
            setFullMatch: jest.fn(),
        }
    }),
}))


describe('Classroom component', () => {
    it('Should call all setters when joined classroom', async () => {

        render(<Classroom params={{ id: "id" }} />);
        expect(useClassroomContext().socket.on).toHaveBeenCalled()
    });
});