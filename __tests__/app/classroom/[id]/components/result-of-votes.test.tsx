import { ResultOfVotes } from "@/app/classroom/[id]/components";
import { useClassroomContext, useUserContext } from "@/app/classroom/[id]/hooks";
import { ClassroomContext, UserContext } from "@/app/classroom/[id]/types";
import { act, fireEvent, render, renderHook, screen } from "@testing-library/react";
import { CreateWrapperContexts, RenderHookContexts } from "../../../../test-utils";


// WITHOUT THIS LINE, THE TESTS ARE SHOWING AN ERROR 
window.setImmediate = window.setTimeout as any


describe('<ResultOfVotes/> tests', () => {

    let result: RenderHookContexts;

    beforeEach(() => {
        const hook = renderHook(() => ({
            classroom: useClassroomContext(),
            user: useUserContext(),
        }), { wrapper: CreateWrapperContexts(<ResultOfVotes />) })

        result = hook.result
    })


    it('Should not render content if amountOfVotes and averageVotes are falsy', () => {
        act(() => {
            result.current.classroom.setAmountOfVotes(null)
        })

        expect(screen.queryByRole("result-of-votes")).not.toBeInTheDocument()
    });

    it('Should not render content if amountOfVotes is falsy and averageVotes truthy', () => {
        act(() => {
            result.current.classroom.setAmountOfVotes(null)
            result.current.classroom.setAverageVotes("123")
        })

        expect(screen.queryByRole("result-of-votes")).not.toBeInTheDocument()
    });

    it('Should render content if amountOfVotes and averageVotes is truthy', () => {
        act(() => {
            result.current.classroom.setAmountOfVotes([{ label: "1", times: 1 }])
            result.current.classroom.setAverageVotes("1")
        })

        expect(screen.queryByRole("result-of-votes")).toBeInTheDocument()
        expect(screen.getByText("Promedio:")).toBeInTheDocument()
    });


    it("Should show the average and the label of the votes", function () {
        act(() => {
            result.current.classroom.setAmountOfVotes([{ label: "10", times: 1 }, { label: "20", times: 1 }])
            result.current.classroom.setAverageVotes("15")
        })

        expect(screen.getByText("15")).toBeInTheDocument()
        expect(screen.getByText("10")).toBeInTheDocument()
        expect(screen.getByText("20")).toBeInTheDocument()
    })


    it("Should show the label of the votes and the times", async function () {
        await act(async () => {
            result.current.classroom.setAmountOfVotes([{ label: "☕", times: 1 }, { label: "❓", times: 3 }])
            result.current.classroom.setAverageVotes("0")
        })

        expect(screen.getByText("☕")).toBeInTheDocument()
        expect(screen.getByText("1 Voto")).toBeInTheDocument()

        expect(screen.getByText("❓")).toBeInTheDocument()
        expect(screen.getByText("3 Voto")).toBeInTheDocument()

        expect(screen.getByText("0")).toBeInTheDocument()
    })



});