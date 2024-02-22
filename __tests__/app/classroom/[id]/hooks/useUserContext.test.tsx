// WITHOUT THIS LINE, THE TESTS ARE SHOWING AN ERROR 
window.setImmediate = window.setTimeout as any

import { UserProvider } from "@/app/classroom/[id]/context";
import { useUserContext } from "@/app/classroom/[id]/hooks";
import { renderHook } from "@testing-library/react";


describe("useClassroomContext tests", function () {
    it("Should execute the hook without errors with provider", function () {

        renderHook(() => useUserContext(),
            {
                wrapper: ({ children }) => (<UserProvider>{children}</UserProvider>)
            }
        )
    })

    it("Should execute the hook with errors if provider is not given", function () {
        expect(() => {
            renderHook(() => useUserContext());
        }).toThrow("User Context not available")
    })


})