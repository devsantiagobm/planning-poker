import NotFoundPage from "@/app/not-found";
import { render } from "@testing-library/react";
import { redirect } from "next/navigation"

jest.mock("next/navigation", () => ({
    redirect: jest.fn()
}))

describe("<NotFoundPage /> tests", function () {
    it("Should execute the 'navigate' function to redirect the user", function () {
        render(<NotFoundPage />)
        expect(redirect).toHaveBeenCalledWith("/classroom/new")
    })
})