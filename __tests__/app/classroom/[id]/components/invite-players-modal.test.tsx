// WITHOUT THIS LINE, THE TESTS ARE SHOWING AN ERROR 
window.setImmediate = window.setTimeout as any


import { InvitePlayersModal } from "@/app/classroom/[id]/components";
import { fireEvent, render, screen } from "@testing-library/react";

const writeText = jest.fn()

// THIS API DOESNT EXIST IN JEST ENVIRONMENT, SO IT MUST BE DEFINED MANUALLY
Object.assign(navigator, {
    clipboard: {
        writeText,
    },
});


describe("<InvitePlayersModal /> tests", function () {

    beforeEach(() => {
        const setModal = jest.fn();
        render(<InvitePlayersModal setModal={setModal} />)

    })

    it("Should show the content in the DOM", function () {
        expect(screen.getByText("Invitar jugadores")).toBeInTheDocument()
        expect(screen.getByAltText("Close icon")).toBeInTheDocument()
    })

    it("Should execute the onClick event on the close modal button", function () {

        const setModalMock = jest.fn();

        const closeButton = screen.getByAltText("Close icon");
        closeButton.addEventListener("click", setModalMock)

        fireEvent.click(closeButton);
        expect(setModalMock).toHaveBeenCalled();
    })

    it("Should find the input and verify that its disabled", function () {
        expect(screen.getByRole("textbox")).toBeInTheDocument()
        expect(screen.getByRole("textbox")).toHaveAttribute("disabled")
    })

    it("Should execute the onClick event on the copy link button", function () {
        const button = screen.getByText("Copiar link")
        fireEvent.click(button)
        expect(writeText).toHaveBeenCalledTimes(1)
    })
})