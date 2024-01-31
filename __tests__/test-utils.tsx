import { ClassroomProvider, UserProvider } from "@/app/classroom/[id]/context";
import { ClassroomContext, UserContext } from "@/app/classroom/[id]/types";

export function CreateWrapperContexts(childrenParent: JSX.Element) {

    return ({ children }: { children: JSX.Element }) => (
        <ClassroomProvider>
            <UserProvider>
                {children}
                {childrenParent}
            </UserProvider>
        </ClassroomProvider>
    )

}


export interface RenderHookContexts {
    current: {
        classroom: ClassroomContext;
        user: UserContext;
    };
}