// WITHOUT THIS LINE, THE TESTS ARE SHOWING AN ERROR 
window.setImmediate = window.setTimeout as any

import NewMatchPage from "@/app/classroom/new/page"
import { act, fireEvent, render, renderHook, screen, waitFor } from "@testing-library/react"
import { useCreateClassroom } from "@/app/classroom/new/hooks/use-create-classroom"

const createClassroomMock = jest.fn()

jest.mock("next/navigation", () => jest.requireActual("next-router-mock"))
jest.mock("../../../../src/app/classroom/new/hooks/use-create-classroom")

describe("<NewMatchPage /> tests", function () {
    let runBeforeEach = true;

    beforeEach(() => {

        if (runBeforeEach) {
            const mock = useCreateClassroom as jest.MockedFunction<typeof useCreateClassroom>
            mock.mockReturnValue({
                createClassroom: createClassroomMock,
                loading: true,
                error: null
            })

            render(<NewMatchPage />)
        }
    })


    it("Should show the basic content in the DOM", function () {
        expect(screen.getByAltText("Pragma logo")).toBeInTheDocument()
        expect(screen.getByTestId("create-match-title")).toBeInTheDocument()
        expect(screen.getByRole("textbox")).toBeInTheDocument()
        expect(screen.getByRole("button")).toBeInTheDocument()
    })


    // it("Should validate custom input format", function () {
    //     expect(customValidate("")).toBeTruthy()
    //     expect(customValidate("shor")).toBeTruthy()
    //     expect(customValidate("textlongerthan20likethis")).toBeTruthy()
    //     expect(customValidate("textwithspecialchar.")).toBeTruthy()
    //     expect(customValidate("manynumbers1234")).toBeTruthy()


    //     expect(customValidate("validValidation")).toBeFalsy()
    //     expect(customValidate("classroom")).toBeFalsy()
    //     expect(customValidate("classroom123")).toBeFalsy()
    //     expect(customValidate("1 example")).toBeFalsy()
    // })

    it("Should show an error when submit is not valid", async function () {
        const input = screen.getByRole("textbox")
        const form = screen.getByRole("form")

        expect(screen.queryByRole("error-advice")).not.toBeInTheDocument()

        fireEvent.input(input, { target: { value: "wrong-text1234" } })
        fireEvent.submit(form)

        await waitFor(function () {
            expect(screen.getByRole("error-advice")).toBeInTheDocument()
        })
    })

    it("Should execute createClassroom when submit is valid", async function () {
        const input = screen.getByRole("textbox")
        const form = screen.getByRole("form")
        const validName = "valid name"

        fireEvent.input(input, { target: { value: validName } })
        fireEvent.submit(form)

        await waitFor(() => {
            expect(createClassroomMock).toHaveBeenCalledWith(validName)
        });
    })


    it('Should display the Loader when loading is true', async () => {
        await waitFor(() => {
            expect(screen.getByRole("loader")).toBeInTheDocument()
        })

        //This says that the test after this test, wont be executed with 'beforeEach'
        runBeforeEach = false;
    })

    it('Should display the Loader when loading is true', async () => {
        const mock = useCreateClassroom as jest.MockedFunction<typeof useCreateClassroom>
        mock.mockReturnValueOnce({
            createClassroom: jest.fn(),
            loading: false,
            error: null
        })

        await act(async () => {
            render(<NewMatchPage />);
        });

        await waitFor(() => {
            expect(screen.getByRole("button").textContent).toBe("Crear partida");
        });

        runBeforeEach = true;
    })
})