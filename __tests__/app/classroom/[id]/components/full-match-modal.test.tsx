// WITHOUT THIS LINE, THE TESTS ARE SHOWING AN ERROR 
window.setImmediate = window.setTimeout as any

import { FullMatchModal } from "@/app/classroom/[id]/components";
import { useClassroomContext, useUserContext } from "@/app/classroom/[id]/hooks";
import { act, fireEvent, render, renderHook, screen } from "@testing-library/react";
import { CreateWrapperContexts, RenderHookContexts } from "../../../../test-utils";

describe('FullMatchModal', () => {
    let result: RenderHookContexts;

    beforeEach(async () => {
        const { result: resultLocal } = renderHook(() => ({
            classroom: useClassroomContext(),
            user: useUserContext()
        }), {
            wrapper: CreateWrapperContexts(<FullMatchModal />)
        })
        result = resultLocal


        await act(async () => {
            result.current.classroom.setFullMatch(true)
        })
    })

    it('Should render Modal and ButtonAtom when fullMatch is true', async () => {
        expect(screen.getByRole('modal')).toBeInTheDocument();
        expect(screen.getByText('Refrescar página')).toBeInTheDocument();
    });

    it('Should not render content when fullMatch is false', async () => {
        await act(async () => {
            result.current.classroom.setFullMatch(false)
        })

        expect(screen.queryByRole('modal')).not.toBeInTheDocument();
        expect(screen.queryByText('Refrescar página')).not.toBeInTheDocument();
    });


    it('Should calls location.reload() when the reload button is clicked', () => {
        const button = screen.getByRole("modal")
        const mock = jest.fn()

        button.addEventListener("click", mock)
        fireEvent.click(button)
        expect(mock).toHaveBeenCalled()
    });

    it('Should calls location.reload() when the reload button is clicked', () => {
        Object.defineProperty(window, 'location', {
            configurable: true,
            value: { reload: jest.fn() },
        });


        const button = screen.getByRole("modal")
        button.addEventListener("click", () => window.location.reload())
        fireEvent.click(button)

        expect(window.location.reload).toHaveBeenCalled();
    });

});
