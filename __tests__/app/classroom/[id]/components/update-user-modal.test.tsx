// WITHOUT THIS LINE, THE TESTS ARE SHOWING AN ERROR 
window.setImmediate = window.setTimeout as any


import { UpdateUserModal } from "@/app/classroom/[id]/components";
import { useClassroomContext, useUserContext } from "@/app/classroom/[id]/hooks";
import { fireEvent, render, renderHook, screen } from "@testing-library/react";
import { CreateWrapperContexts, RenderHookContexts } from "../../../../test-utils";
    

//todo finish tests
describe('<UpdateUserModal/> tests', () => {

    let result: RenderHookContexts;

    beforeEach(() => {
        const setModal = jest.fn()

        const hook = renderHook(() => ({
            classroom: useClassroomContext(),
            user: useUserContext(),
        }), { wrapper: CreateWrapperContexts(<UpdateUserModal setModal={setModal} />) })

        result = hook.result
    })


    it('renders without crashing', () => {
        // render(<NewPlayerForm params={{ id: 'example-id' }} />);
    });

    // it('submits the form with valid data', async () => {
    //     render(<NewPlayerForm params={{ id: 'example-id' }} />);

    //     Simulate user input
    //     fireEvent.input(screen.getByLabelText("Tu nombre"), { target: { value: 'John Doe' } });
    //     fireEvent.click(screen.getByLabelText(/tipo de jugador/i));

    //     Trigger form submission
    //     fireEvent.submit(screen.getByRole('button', { name: /continuar/i }));

    //     Add assertions for the expected behavior after form submission
    //     For example, check that setIsUserCreated, setUsername, and setTypeOfPlayer were called
    // });

    // it('displays error message for invalid username', async () => {
    //     render(<NewPlayerForm params={{ id: 'example-id' }} />);

    //     // Simulate user input with invalid username
    //     firee.type(screen.getByLabelText(/tu nombre/i), 'John@123');

    //     // Trigger form submission
    //     fireEvent.submit(screen.getByRole('button', { name: /continuar/i }));

    //     // Assert that the error message is displayed
    //     expect(screen.getByText(/Ingresa un texto de 5 a 20 caracteres/i)).toBeInTheDocument();
    // });
});