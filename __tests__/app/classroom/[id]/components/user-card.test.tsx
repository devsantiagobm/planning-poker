// WITHOUT THIS LINE, THE TESTS ARE SHOWING AN ERROR 
window.setImmediate = window.setTimeout as any
import { UserCard } from "@/app/classroom/[id]/components";
import { ClassroomProvider } from "@/app/classroom/[id]/context";
import { render } from "@testing-library/react";


describe("<UserCard /> tests", function () {
    it("Should render without crashing", function () {
        render(
            <ClassroomProvider>
                <UserCard username="username" socketID="socketID" type="player" _id="id" roomID="roomI" />
            </ClassroomProvider>
        )
    })


    it("Should", function () {
        render(
            <ClassroomProvider>
                <UserCard username="username" socketID="socketID" type="player" _id="id" roomID="roomI" />
            </ClassroomProvider>
        );

    })
})