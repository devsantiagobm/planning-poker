// WITHOUT THIS LINE, THE TESTS ARE SHOWING AN ERROR 
window.setImmediate = window.setTimeout as any


import { PokerHeader } from "@/app/classroom/[id]/components";
import { useClassroomContext, useUserContext } from "@/app/classroom/[id]/hooks";
import { act, fireEvent, renderHook, screen, waitFor } from "@testing-library/react";
import { CreateWrapperContexts, RenderHookContexts } from "../../../../test-utils";
import { scoringModesElements } from "@/app/classroom/[id]/utils";

const socket = "my-socket-id"

jest.mock("socket.io-client", () => ({
    io: () => ({
        id: "my-socket-id"
    })
}))


describe('<PokerHeader/> tests', () => {

    let result: RenderHookContexts;

    beforeEach(() => {
        const hook = renderHook(() => ({
            classroom: useClassroomContext(),
            user: useUserContext(),
        }), { wrapper: CreateWrapperContexts(<PokerHeader />) })

        result = hook.result
    })


    it('Should render the basic content of the component with the default context data', () => {
        expect(screen.getByRole("pragma-logo")).toBeInTheDocument()
        expect(screen.getByRole("title")).toBeInTheDocument()
        expect(screen.getByRole("menu-handler")).toBeInTheDocument()
        expect(screen.getByText("Invitar jugadores")).toBeInTheDocument()



        expect(screen.getByRole("title").textContent).toBeFalsy()
        expect(screen.queryByRole("change-score-button")).not.toBeInTheDocument()
        expect(screen.queryByRole("edit-user")).not.toBeInTheDocument()
    });


    it("Should show the title when it is in the context", async function () {
        const name = "example of name"

        await act(async () => {
            result.current.classroom.setClassroomName(name)
        })

        expect(screen.getByRole("title").textContent).toBe(name)
        expect(screen.getByRole("title")).toBeVisible()
    })

    it("Should show the letter avatar component if username is truthy", async function () {
        const name = "santiago"

        await act(async () => {
            result.current.user.setUsername(name)
        })

        expect(screen.getByRole("edit-user")).toBeInTheDocument()
        expect(screen.getByRole("edit-user").textContent).toBe("SA")
    })

    it("Should show the change score button if averagevotes is falsy and isOwner is true", async function () {
        const name = "santiago"

        await act(async () => {
            result.current.user.setUsername(name)
        })

        expect(screen.getByRole("edit-user")).toBeInTheDocument()
        expect(screen.getByRole("edit-user").textContent).toBe("SA")
    })

    it("Should show the change score button if averagevotes is falsy and isOwner is true", async function () {
        await act(async () => {
            result.current.classroom.setOwners([socket])
        })

        expect(result.current.classroom.averageVotes).toBeFalsy()
        expect(screen.queryByRole("change-score-button")).toBeInTheDocument()
    })

    it("Should not show the change score button if averagevotes is truthy", async function () {
        await act(async () => {
            result.current.classroom.setOwners([socket])
            result.current.classroom.setAverageVotes("123")
        })

        expect(result.current.classroom.averageVotes).toBeTruthy()
        expect(screen.queryByRole("change-score-button")).not.toBeInTheDocument()
    })

    it("Should not show the change score button if user is not admin and watch it if he is", async function () {
        await act(async () => {
            result.current.classroom.setOwners(["another-socket"])
        })

        expect(screen.queryByRole("change-score-button")).not.toBeInTheDocument()

        await act(async () => {
            result.current.classroom.setOwners([socket])
        })

        expect(screen.queryByRole("change-score-button")).toBeInTheDocument()
    })



    it("Should open the scoring modes modal and show its content", async function () {
        await act(async () => {
            result.current.classroom.setOwners([socket])
        })

        await act(async () => {
            fireEvent.click(screen.getByRole("change-score-button"))
        })

        expect(screen.getByText("Tipo de puntajes")).toBeInTheDocument()
        expect(screen.getByRole("button", { name: "button-close" })).toBeInTheDocument()
        expect(screen.getByRole("button", { name: "Cambiar puntajes" })).toBeInTheDocument()

        for (const { label } of scoringModesElements) {
            expect(screen.getByLabelText(label)).toBeInTheDocument()
        }
    })

    it("Should open the scoring modes modal and hide it after click the close button", async function () {
        await act(async () => {
            result.current.classroom.setOwners([socket])
        })

        await act(async () => {
            fireEvent.click(screen.getByRole("change-score-button"))
        })


        await act(async () => {
            fireEvent.click(screen.getByRole("button", { name: "button-close" }))
        })

        await waitFor(async () => {
            expect(screen.queryByRole("button", { name: "Cambiar puntajes" })).not.toBeInTheDocument()
        })
    })

    it("Should open the invite players modal and show its content", async function () {
        await act(async () => {
            fireEvent.click(screen.getByText("Invitar jugadores"));
        });

        expect(screen.getByRole("button", { name: "button-close" })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Copiar link" })).toBeInTheDocument();

        expect(screen.getByRole("textbox", { name: "copy-url-textbox" })).toBeInTheDocument();
    });

    it("Should open the invite players modal and hide it after clicking the close button", async function () {
        await act(async () => {
            fireEvent.click(screen.getByText("Invitar jugadores"));
        });

        await act(async () => {
            fireEvent.click(screen.getByRole("button", { name: "button-close" }));
        });

        await waitFor(async () => {
            expect(screen.queryByRole("button", { name: "Copiar link" })).not.toBeInTheDocument();
        });
    });
});