import { ReactElement, createContext, useState } from "react";
import { TypeOfPlayers } from "../types";
import { UserContext as UserContextI } from "../types";

export const UserContext = createContext<UserContextI | null>(null)


export function UserProvider({ children }: { children: JSX.Element | ReactElement | ReactElement[] }) {
    const [username, setUsername] = useState("")
    const [typeOfPlayer, setTypeOfPlayer] = useState<TypeOfPlayers>("player")

    return (
        <UserContext.Provider value={{
            username, setUsername, typeOfPlayer, setTypeOfPlayer
        }}>
            {children}
        </UserContext.Provider>
    )
}