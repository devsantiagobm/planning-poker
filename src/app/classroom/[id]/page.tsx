"use client";

import { ClassroomProvider, UserProvider } from "./context";
import { ClassroomContent } from "./components";
import { Params } from "./types";
import { Classroom } from "./types"


export default function Classroom({ params }: Params) {
    return (
        <ClassroomProvider>
            <UserProvider>
                <ClassroomContent params={params} />
            </UserProvider>
        </ClassroomProvider>
    )
}

