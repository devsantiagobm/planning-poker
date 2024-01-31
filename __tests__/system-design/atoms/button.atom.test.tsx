import { ButtonAtom } from "@/system-design";
import { render, screen } from "@testing-library/react";
import { variants } from "@/system-design/atoms/button.atom";

describe("<ButtonAtom /> tests", function () {
    it("Should render the button", function () {
        render(<ButtonAtom variant="primary" >Hello from button</ButtonAtom>)

        const element = screen.getByText("Hello from button")

        expect(element).toBeInTheDocument()
        expect(element).toHaveClass("button")
    })

    it("Should render the button with a custom className", function () {
        render(<ButtonAtom data-testid="button" variant="primary" className="custom-classname" />)

        const element = screen.getByTestId("button")

        expect(element).toBeInTheDocument()
        expect(element).toHaveClass("button")
        expect(element).toHaveClass("custom-classname")
    })

    it("Should render the correct classnames by their variants", function () {
        const arrayOfVariants = Object.entries(variants)

        arrayOfVariants.forEach(([variant, className]) => {
            render(<ButtonAtom data-testid={`${variant}-button`} variant={variant as "primary" | "secondary" | "third"} />)
            const button = screen.getByTestId(`${variant}-button`)
            expect(button).toHaveClass(className)
        })
    })
})