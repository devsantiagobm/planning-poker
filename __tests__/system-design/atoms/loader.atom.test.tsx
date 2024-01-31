import { Loader } from "@/system-design";
import { render, screen } from "@testing-library/react";

describe('<Loader /> tests', () => {
    it('Should render the component without errors', () => {
        render(<Loader />);
        expect(screen.getByTestId('loader')).toBeInTheDocument();
    });

    it('Should apply custom className and loader class', () => {
        const customClassName = 'custom-class';
        render(<Loader className={customClassName} />);
        expect(screen.getByTestId('loader')).toHaveClass(`loader ${customClassName}`);
    });

    it('Should apply additional props', () => {
        render(<Loader data-custom="custom-value" />);
        expect(screen.getByTestId('loader')).toHaveAttribute('data-custom', 'custom-value');
    });
});