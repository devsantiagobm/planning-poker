// WITHOUT THIS LINE, THE TESTS ARE SHOWING AN ERROR 
window.setImmediate = window.setTimeout as any

import { NewPlayerForm } from "@/app/classroom/[id]/components";
import { useClassroomContext, useUserContext } from "@/app/classroom/[id]/hooks";
import { act, fireEvent, renderHook, screen, waitFor } from "@testing-library/react";
import { CreateWrapperContexts, RenderHookContexts } from "../../../../test-utils";
import { customValidate } from "@/app/classroom/[id]/components/new-player-form";


describe('<NewPlayerForm/> tests', () => {

    let result: RenderHookContexts;

    beforeEach(() => {
        const hook = renderHook(() => ({
            classroom: useClassroomContext(),
            user: useUserContext(),
        }), { wrapper: CreateWrapperContexts(<NewPlayerForm params={{ id: "example-classroom-id" }} />) })

        result = hook.result
    })



    it("Should render the basic content", async function () {
        expect(screen.getByLabelText("Tu nombre")).toBeInTheDocument()
        expect(screen.getByLabelText("Jugador")).toBeInTheDocument()
        expect(screen.getByLabelText("Espectador")).toBeInTheDocument()
        expect(screen.getByRole("button")).toBeInTheDocument()
    })

    it("Should not render content if 'isUserCreated' is true", async function () {
        expect(screen.getByTestId("new-player-form")).toBeInTheDocument()

        await act(async () => {
            result.current.classroom.setIsUserCreated(true)
        })

        await waitFor(() => {
            expect(screen.queryByTestId("new-player-form")).not.toBeInTheDocument()
        })
    })

    it("Should validate custom input format", function () {
        expect(customValidate("")).toBeTruthy()
        expect(customValidate("shor")).toBeTruthy()
        expect(customValidate("textlongerthan20likethis")).toBeTruthy()
        expect(customValidate("textwithspecialchar.")).toBeTruthy()
        expect(customValidate("manynumbers1234")).toBeTruthy()


        expect(customValidate("validValidation")).toBeFalsy()
        expect(customValidate("myname")).toBeFalsy()
        expect(customValidate("myname123")).toBeFalsy()
        expect(customValidate("another example")).toBeFalsy()
    })

    it('Should show the error advice if input is invalid and hide it if then the input format is valid', async () => {
        expect(screen.queryByRole("error-advice")).not.toBeInTheDocument()

        const form = screen.getByRole("form")
        const input = screen.getByRole("textbox")

        fireEvent.input(input, { target: { value: "invalid.input" } })
        fireEvent.submit(form)

        await waitFor(async () => {
            expect(screen.getByRole("error-advice")).toBeInTheDocument()
            expect(screen.getByText("Ingresa un texto de 5 a 20 caracteres, sin caracteres especiales y con máximo 3 números")).toBeInTheDocument()
        })

        fireEvent.input(input, { target: { value: "valid input" } })

        waitFor(() => {
            expect(screen.queryByRole("error-advice")).not.toBeInTheDocument()
        })
    });

    it("Should display error when submitting form without selecting radio input and remove error upon selection", async () => {
        expect(screen.queryByRole("error-advice")).not.toBeInTheDocument()

        const form = screen.getByRole("form")
        const input = screen.getByRole("textbox")
        const radio = screen.getByLabelText("Jugador")

        fireEvent.input(input, { target: { value: "valid input" } })
        fireEvent.submit(form)

        await waitFor(async () => {
            expect(screen.getByRole("error-advice")).toBeInTheDocument()
            expect(screen.getByText("Elige un tipo de jugador para poder ingresar")).toBeInTheDocument()
        })

        fireEvent.click(radio)

        expect(radio).toBeChecked()

        waitFor(() => {
            expect(screen.queryByRole("error-advice")).not.toBeInTheDocument()
        })
    });

    it("Should display error when submitting form without selecting radio input and remove error upon selection", async () => {
        expect(screen.queryByRole("error-advice")).not.toBeInTheDocument()

        const form = screen.getByRole("form")
        const input = screen.getByRole("textbox")
        const radio = screen.getByLabelText("Jugador")

        fireEvent.input(input, { target: { value: "valid input" } })
        fireEvent.submit(form)

        await waitFor(async () => {
            expect(screen.getByRole("error-advice")).toBeInTheDocument()
            expect(screen.getByText("Elige un tipo de jugador para poder ingresar")).toBeInTheDocument()
        })

        fireEvent.click(radio)

        expect(radio).toBeChecked()

        waitFor(() => {
            expect(screen.queryByRole("error-advice")).not.toBeInTheDocument()
        })
    });

    it("Should execute the mocked function with valid inputs and after submitting", async () => {
        const submitMock = jest.fn()
        const form = screen.getByRole("form")
        form.addEventListener("submit", submitMock)

        fireEvent.input(screen.getByRole("textbox"), { target: { value: "valid input" } })
        fireEvent.click(screen.getByLabelText("Jugador"))

        fireEvent.submit(form)

        expect(submitMock).toHaveBeenCalled()
    });

});