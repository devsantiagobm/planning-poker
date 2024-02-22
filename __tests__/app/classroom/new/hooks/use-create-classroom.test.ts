import { useCreateClassroom } from "@/app/classroom/new/hooks/use-create-classroom";
import { act, renderHook } from "@testing-library/react";
import { axios } from "@/utils"

const classRoomId = "classroom12345"
const pushMocked = jest.fn()

jest.mock("next/navigation", () => ({
    useRouter: () => ({
        push: pushMocked
    })
}))

jest.mock("../../../../../src/utils", () => ({
    axios: jest.fn(() => {
        return {
            data: { classRoomId }
        }
    })
}))

describe("useCreateClassroom hook tests", function () {
    it("Should execute the push function with the correct classroomId", async function () {
        const classRoomName = "example"
        const { result } = renderHook(() => useCreateClassroom());
        const { createClassroom } = result.current;

        await act(async () => {
            await createClassroom(classRoomName);
        })

        expect(axios).toHaveBeenCalledWith(
            {
                url: "/classroom",
                method: "POST",
                data: { "name": classRoomName }
            }
        );

        expect(pushMocked).toHaveBeenCalledWith(`/classroom/${classRoomId}`);
    })

    it('should handle error state correctly', async () => {
        const mockedAxios = axios as jest.MockedFunction<typeof axios>;
        mockedAxios.mockRejectedValue(new Error('An error occurred'));

        const { result } = renderHook(() => useCreateClassroom());
        const { createClassroom } = result.current

        await act(async () => {
            await createClassroom('Example');
        });

        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBe('An error occurred');
    });
})
