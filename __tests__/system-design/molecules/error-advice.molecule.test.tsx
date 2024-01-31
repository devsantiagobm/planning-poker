import { ErrorAdvice } from "@/system-design"
import { render, screen, waitFor } from "@testing-library/react"

describe("<ErrorAdvice /> tests", function () {
    it("Should render without problems", function () {
        render(<ErrorAdvice title="Example" description="Example" />)
    })

    it("Should show the props in the DOM", function () {
        render(<ErrorAdvice title="title-example" description="title-description" />)
        expect(screen.getByText("title-example")).toBeInTheDocument()
        expect(screen.getByText("title-description")).toBeInTheDocument()
    })

    it("Should show an error icon", function () {
        render(<ErrorAdvice title="title-example" description="title-description" />)
        expect(screen.getByTestId("error-icon")).toBeInTheDocument()
    })

    it("Should have initially opacity 0 and then animate to opacity 1", async function () {
        const { container } = render(<ErrorAdvice title="title-example" description="title-description" />)
        const errorAdviceElement = container.querySelector('.error-advice');
        expect(errorAdviceElement).toHaveStyle('opacity: 0');

        await waitFor(() => {
            expect(errorAdviceElement).toHaveStyle('opacity: 1');
        });
    })
})