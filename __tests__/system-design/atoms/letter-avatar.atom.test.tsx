import { LetterAvatar } from "@/system-design"
import { render, screen } from "@testing-library/react"


describe("<LetterAvatar /> tests", function () {
    const letters = "AB"
    const defaultClassname = "letter-avatar"

    it("Should renders with basic props", function () {
        render(<LetterAvatar letters={letters} />)
        expect(screen.getByText(letters)).toBeInTheDocument()
        expect(screen.getByText(letters)).toHaveClass(defaultClassname)
    })

    it("Should have the big variant className when renders with variant='big' prop", function () {
        render(<LetterAvatar letters={letters} variant="big" />)
        expect(screen.getByText(letters)).toHaveClass("letter-avatar__big")
    })

    it("Should render with multiple classNames if this goes in the props", function () {
        const customClassname = "custom__classname"
        render(<LetterAvatar letters={letters} className={customClassname} />)
        expect(screen.getByText(letters)).toHaveClass(customClassname)
        expect(screen.getByText(letters)).toHaveClass(defaultClassname)
    })
})