import { InputRadioAtom } from "@/system-design";
import { fireEvent, render, screen } from "@testing-library/react";


describe("<InputRadioAtom /> tests", function () {
    it("Should render correctly with his props", function () {
        render(<InputRadioAtom label="label-example" name="input-name" value="value-example" defaultChecked={false} />)
        const inputElement = screen.getByLabelText('label-example');

        expect(screen.getByText("label-example")).toBeInTheDocument()
        expect(inputElement).toBeInTheDocument()
        expect(inputElement).not.toBeChecked()

        expect(inputElement).not.toBeVisible()
        expect(screen.getByTestId("label-input-radio")).toContainElement(screen.getByTestId("input-radio-input"))
    })


    it("Should render the input checked if defaultChecked is true", function () {
        render(<InputRadioAtom label="label-example" name="input-name" value="value-example" defaultChecked={true} />)
        expect(screen.getByTestId('input-radio-input')).toBeChecked();
    })


    it("Should check the input after click the exact input", function () {
        render(<InputRadioAtom label="label-example" name="input-name" value="value-example" defaultChecked={false} />)

        const inputElement = screen.getByLabelText('label-example');
        expect(inputElement).toBeInTheDocument()
        expect(inputElement).not.toBeChecked()

        fireEvent.click(inputElement)

        expect(inputElement).toBeChecked()
    })

    it("Should check the input after click the labels input", function () {
        render(<InputRadioAtom label="label-example" name="input-name" value="value-example" defaultChecked={false} />)

        const inputElement = screen.getByLabelText('label-example');
        const labelElement = screen.getByTestId('label-input-radio');

        expect(inputElement).toBeInTheDocument()
        expect(inputElement).not.toBeChecked()

        fireEvent.click(labelElement)

        expect(inputElement).toBeChecked()
    })
})