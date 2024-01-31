import { useMemo } from "react"
import { useClassroomContext } from "."

export function useSplitPlayers() {
    const { players } = useClassroomContext()

    return useMemo(() => {
        const firstUser = players[0]
        const secondUser = players[1]

        const staticPlayersLength = players.length
        const indexInMiddle = staticPlayersLength / 2 + 1

        const firstHalfOfUsers = players.slice(2, Math.ceil(indexInMiddle))
        const secondHalfOfUsers = players.slice(Math.ceil(indexInMiddle), staticPlayersLength)

        return {
            firstUser, secondUser, firstHalfOfUsers, secondHalfOfUsers
        }

    }, [players])
}