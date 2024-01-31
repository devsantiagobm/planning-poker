import { useContext } from "react"
import { ClassroomContext } from "../context"

export function useClassroomContext() {
    const context = useContext(ClassroomContext)

    if(!context) throw new Error("Classroom Context not available")

    return context
}