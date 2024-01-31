import { InputAtom } from "@/system-design";
import { fireEvent, render, screen } from "@testing-library/react";
import exp from "constants";


describe("<InputAtom /> tests", function () {
    it("Should render with only obligatory props", function () {
        render(<InputAtom data-testid="input" id="input-example" />)
        const input = screen.getByTestId("input")
        expect(input).toBeInTheDocument()
    })

    it("Should render a label", function () {
        const { container } = render(<InputAtom data-testid="input" label="Input Example" id="input-example" />)
        expect(container.querySelector("label")).toBeInTheDocument()
    })

    it("Should render the attributes correctly", function () {
        render(<InputAtom type="number" data-testid="input" label="Input Example" id="input-example" />)

        const input = screen.getByTestId("input")

        expect(input).toHaveAttribute("id", "input-example")
        expect(input).toHaveAttribute("name", "input-example")
        expect(input).toHaveAttribute("type", "number")
    })

    it("Should not render a label without 'label' prop", function () {
        const { container } = render(<InputAtom data-testid="input" id="input-example" />)
        expect(container.querySelector("label")).not.toBeInTheDocument()
    })

    it("Should render with a custom classname if its in a prop", function () {
        render(<InputAtom data-testid="input" className="custom-classname" id="input-example" />)
        const input = screen.getByTestId("input")
        expect(input).toHaveClass("input__textbox")
        expect(input).toHaveClass("custom-classname")
    })

    it("Should change his value when input event happens", function () {
        render(<InputAtom data-testid="input" className="custom-classname" id="input-example" />)
        const input = screen.getByTestId("input")

        fireEvent.input(input, { target: { value: 'test text' } })
        expect(input).toHaveValue("test text")
    })
})