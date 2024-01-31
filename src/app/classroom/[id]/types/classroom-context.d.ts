import { Socket } from "socket.io-client";
import { AmountOfVotes } from ".";
import { FullPlayer, SetState, TypeOfScores } from "@/types";

export interface ClassroomContext {
    isUserCreated: boolean
    setIsUserCreated: SetState<boolean>
    socket: Socket
    classroomName: string | null
    setClassroomName: SetState<string | null>,
    players: FullPlayer[]
    setPlayers: SetState<FullPlayer[]>
    averageVotes: string | null
    setAverageVotes: SetState<string | null>
    amountOfVotes: AmountOfVotes[] | null
    setAmountOfVotes: SetState<AmountOfVotes[] | null>
    owners: string[]
    isOwner: boolean
    setOwners: SetState<string[]>
    arePlayersReady: boolean
    globalTypeOfScores: TypeOfScores
    setGlobalTypeOfScores: SetState<TypeOfScores>
    fullMatch: boolean
    setFullMatch: SetState<boolean>
}