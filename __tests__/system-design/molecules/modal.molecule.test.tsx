import { Modal } from "@/system-design";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

describe("<Modal /> tests", function () {
    it("Should render the component with children text", function () {
        const text = "Hello from the modal"
        render(<Modal><div>{text}</div></Modal>)

        expect(screen.getByText(text)).toBeInTheDocument()
    })

    it("Should render the component with Header and Body component and their styles", function () {
        const headerText = "Hello from Modal.Header component"
        const headerBody = "Hello from Modal.Body component"

        render(
            <Modal>
                <Modal.Header>{headerText}</Modal.Header>
                <Modal.Body>{headerBody}</Modal.Body>
            </Modal>
        )

        expect(screen.getByText(headerText)).toBeInTheDocument()


        expect(screen.getByText(headerBody)).toBeInTheDocument()

    })

    it("Should render the component with custom props and their default styles", function () {
        const headerID = "header"
        const bodyID = "body"
        const customClassname = "custom-classname"

        render(
            <Modal>
                <Modal.Header data-testid={headerID} className={customClassname}>From the header </Modal.Header>
                <Modal.Body data-testid={bodyID} className={customClassname}>From the body</Modal.Body>
            </Modal>
        )

        expect(screen.getByTestId(headerID)).toBeInTheDocument()
        expect(screen.getByTestId(headerID)).toHaveClass(customClassname)
        expect(screen.getByTestId(headerID)).toHaveStyle({
            backgroundColor: "rgb(100, 56, 183);"
        })

        expect(screen.getByTestId(bodyID)).toBeInTheDocument()
        expect(screen.getByTestId(bodyID)).toHaveClass(customClassname)
        expect(screen.getByTestId(bodyID)).toHaveStyle({
            backgroundColor: "#1f0d3f;"
        })
    })

    it("Should render the component initially with opacity 0 and change to opacity 1", async function () {
        render(
            <Modal data-testid="modal">
                <Modal.Body>Hello</Modal.Body>
            </Modal>
        )

        const modal = screen.getByTestId("modal")
        expect(modal).toBeInTheDocument()
        expect(modal).toHaveStyle({ opacity: 0 })


        await waitFor(function () {
            expect(modal).toHaveStyle({ opacity: 1 })
        })
    })

    it("Should execute events", async function () {
        const onClickMock = jest.fn()
        render(
            <Modal data-testid="modal">
                <Modal.Body>
                    <button data-testid="my-button" onClick={onClickMock}>Click me!</button>
                </Modal.Body>
            </Modal>
        )

        fireEvent.click(screen.getByTestId("my-button"))
        expect(onClickMock).toHaveBeenCalled()

    })
})