import { RadioGroupMolecule } from "@/system-design"
import { render, screen } from "@testing-library/react"

describe("<RadioGroupMolecule /> tests", function () {
    it("Should render the component without errors", function () {
        render(<RadioGroupMolecule />)

        expect(screen.getByTestId("radio-group")).toBeInTheDocument()
    })

    it('Should apply custom className', () => {
        const customClassName = 'custom-class';
        render(<RadioGroupMolecule className={customClassName} />);
        expect(screen.getByTestId('radio-group')).toHaveClass(`radio-group ${customClassName}`);
    });

    it('Should render children', () => {
        const childContent = 'Hello, World!';
        render(<RadioGroupMolecule>{childContent}</RadioGroupMolecule>);
        expect(screen.getByTestId('radio-group')).toHaveTextContent(childContent);
    });

})