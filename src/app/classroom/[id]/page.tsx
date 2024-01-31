"use client";

import { useClassroomContext, } from "./hooks";
import { ClassroomProvider, UserProvider } from "./context";
import { NewPlayerForm, PokerHeader, PokerTable, Cards, ResultOfVotes, FullMatchModal } from "./components";
import { Params } from "./types";
import { useEffect } from "react";
import { Classroom } from "./types"
import { FullPlayer } from "@/types";


export default function Classroom({ params }: Params) {
    return (
        <ClassroomProvider>
            <UserProvider>
                <ClassroomContent params={params} />
            </UserProvider>
        </ClassroomProvider>
    )
}

export function ClassroomContent({ params }: Params) {
    const { socket, setAmountOfVotes, setAverageVotes, setGlobalTypeOfScores, setOwners, setClassroomName, setPlayers, setFullMatch } = useClassroomContext()

    useEffect(() => {
        socket.on("join-classroom", function ({ classroom, players }: { classroom: Classroom, players: FullPlayer[] }) {
            setOwners(classroom.owners)
            setClassroomName(classroom.name)
            setPlayers(players)
            setGlobalTypeOfScores(classroom.typeOfScores)
        })

        socket.on("update-classroom", function ({ players }: { players: FullPlayer[] }) {
            setPlayers(players)
        })

        socket.on("add-admin", function ({ players, classroom }: { classroom: Classroom, players: FullPlayer[] }) {
            setPlayers(players)
            setOwners(classroom.owners)
        })

        socket.on("player-disconnected", function ({ players, classroom }: { classroom: Classroom, players: FullPlayer[] }) {
            setOwners(classroom.owners)
            setPlayers(players)
        })

        socket.on("reveal-cards", function ({ average, amountOfVotes }: { average: string, amountOfVotes: { label: string; times: number }[] }) {
            setAverageVotes(average)
            setAmountOfVotes(amountOfVotes)
        })

        socket.on("reset-classroom", function ({ players }: { players: FullPlayer[] }) {
            setAverageVotes(null)
            setAmountOfVotes(null)
            setPlayers(players)
        })

        socket.on("update-player", function ({ players }: { players: FullPlayer[] }) {
            setPlayers(players)
        })

        socket.on("change-type-of-score", function ({ players, classroom }: { classroom: Classroom, players: FullPlayer[] }) {
            setGlobalTypeOfScores(classroom.typeOfScores)
            setPlayers(players)
        })

        socket.on("match-full", function ({ message }: { message: string }) {
            setFullMatch(true);
        })

        return () => {
            socket.disconnect();
        };
    }, [])

    return (
        <main className="classroom">
            <NewPlayerForm params={params} />
            <PokerHeader />
            <PokerTable />
            <Cards />
            <ResultOfVotes />
            <FullMatchModal />
        </main>
    )
}

