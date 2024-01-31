"use client";
import { io } from "socket.io-client";
import { ReactElement, createContext, useMemo, useState } from "react";
import { AmountOfVotes } from "../types";
import { FullPlayer } from "@/types";
import { TypeOfScores } from "@/types";
import { ClassroomContext as ClassroomContextI } from "../types";

//This url is exported to make tests

export const url = process?.env?.NEXT_PUBLIC_SERVER_URL ?? "http://localhost:8080"
const socket = io(url, {
    reconnection: false
});

export const ClassroomContext = createContext<ClassroomContextI | null>(null)

export function ClassroomProvider({ children }: { children: JSX.Element | ReactElement }) {
    const [isUserCreated, setIsUserCreated] = useState(false)
    const [players, setPlayers] = useState<FullPlayer[]>([])
    const [averageVotes, setAverageVotes] = useState<string | null>(null)
    const [amountOfVotes, setAmountOfVotes] = useState<AmountOfVotes[] | null>(null)


    const [classroomName, setClassroomName] = useState<string | null>(null)
    const [owners, setOwners] = useState<string[]>([])
    const [globalTypeOfScores, setGlobalTypeOfScores] = useState<TypeOfScores>("fibonacci")

    const [fullMatch, setFullMatch] = useState(false)

    const arePlayersReady = useMemo(() => players.filter(({ type }) => type === "player").every(({ vote }) => Boolean(vote)) && players.filter(({ type }) => type === "player").length > 0, [players])

    const isOwner = owners.includes(socket.id)

    return (
        <ClassroomContext.Provider value={
            {
                isUserCreated,
                setIsUserCreated,
                socket,
                classroomName,
                setClassroomName,
                players,
                setPlayers,
                averageVotes,
                amountOfVotes,
                setAmountOfVotes,
                setAverageVotes,
                isOwner,
                owners,
                setOwners,
                arePlayersReady,
                globalTypeOfScores,
                setGlobalTypeOfScores,
                fullMatch,
                setFullMatch
            }
        }>
            {children}
        </ClassroomContext.Provider>
    )
}