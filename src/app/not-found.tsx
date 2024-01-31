import { redirect } from "next/navigation"

export default function NotFoundPage() {
    redirect("/classroom/new")

    // THE RENDER FUNCTION IN THE TESTS MUST HAVE A COMPONENT THAT RETURNS JSX. EVEN IF THIS LINE DOESNT MAKE SENSE, ITS OBLIGATORY
    return <></>
}