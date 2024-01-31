import { SetState } from "@/types"
import { TypeOfPlayers } from "."

export interface UserContext {
    username: string
    setUsername: SetState<string>
    typeOfPlayer: TypeOfPlayers
    setTypeOfPlayer: SetState<TypeOfPlayers>
}

