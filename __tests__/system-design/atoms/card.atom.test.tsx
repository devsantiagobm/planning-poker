import { Card } from "@/system-design";
import { fireEvent, render, screen } from "@testing-library/react";


describe("<Card /> tests", function () {
    it("Should render the component without props", function () {
        render(<Card />)

        const card = screen.getByTestId("card")

        expect(card).toBeInTheDocument()
        expect(card).toBeVisible()
        expect(card).toHaveClass("card")
    })

    it("Should render the component with className props and variant big", function () {
        render(<Card className="custom-classname" variant="big" />)
        const card = screen.getByTestId("card")

        expect(card).toHaveClass("card")
        expect(card).toHaveClass("card--big")
        expect(card).toHaveClass("custom-classname")
    })

    it("Should render the component with the children prop", function () {
        render((
            <Card className="custom-classname" variant="big">
                <h1>Hello from title</h1>
                <span data-testid="span-test">Hello from span test</span>
            </Card>
        ))

        expect(screen.getByText("Hello from title")).toBeInTheDocument()
        expect(screen.getByTestId("span-test")).toBeInTheDocument()

    })

    it('Should handle click event correctly', () => {
        const onClickMock = jest.fn();
        const { getByTestId } = render(<Card onClick={onClickMock}>Click me</Card>);
        fireEvent.click(getByTestId('card'));
        expect(onClickMock).toHaveBeenCalled();
    });
})