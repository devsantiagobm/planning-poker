// WITHOUT THIS LINE, THE TESTS ARE SHOWING AN ERROR 
window.setImmediate = window.setTimeout as any

import { ClassroomProvider } from "@/app/classroom/[id]/context";
import { useClassroomContext } from "@/app/classroom/[id]/hooks";
import { renderHook } from "@testing-library/react";

describe("useClassroomContext tests", function () {
    it("Should execute the hook without errors with provider", function () {
        renderHook(() => useClassroomContext(),
            {
                wrapper: ({ children }) => (<ClassroomProvider>{children}</ClassroomProvider>)
            }
        )
    })

    it("Should execute the hook with errors if provider is not given", function () {
        expect(() => {
            renderHook(() => useClassroomContext());
        }).toThrow("Classroom Context not available")
    })


})