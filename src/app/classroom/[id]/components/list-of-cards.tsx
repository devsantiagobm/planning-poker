import { Card } from "@/system-design"
import { useEffect, useState } from "react"
import { useClassroomContext, useUserContext } from "../hooks"
import { motion } from "framer-motion"
import { typesOfScores } from "@/utils"

export function CardsContent() {
    const [selectedCard, setSelectedCard] = useState<string | null>(null)
    const { socket, globalTypeOfScores } = useClassroomContext()

    useEffect(() => {
        if (selectedCard != null) {
            socket.emit("vote", { card: selectedCard })
        }
    }, [selectedCard])

    useEffect(() => {
        // When a user connects to the classroom and the players in the classroom have already voted and shown the 
        // results, the app displays this view to the new user. This means they can still vote. However, if, in this scenario, 
        // the owner of the classroom restarts the match, the selected card still appears as active, which doesn't make sense.
        // Additionally, even if the card is active in the user interface, in the database, due to the owner restarting 
        // the match, the new user doesn't have any card selected.

        socket.on("reset-classroom", function () {
            setSelectedCard(null)
        })

        socket.on("change-type-of-score", function () {
            setSelectedCard(null)
        })
    }, [])

    return (
        <>
            {
                globalTypeOfScores && (
                    <motion.div key={globalTypeOfScores} className="classroom__cards" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} data-testid="list-of-cards">
                        <span className="classroom__choose-a-card-text">Elige una carta 👇</span>

                        <div className="classroom__list-of-cards">
                            {
                                typesOfScores[globalTypeOfScores].map(value => (
                                    <Card key={value}
                                        variant="big" className={`classroom__card ${selectedCard === value && "classroom__card--active"}`}
                                        onClick={() => setSelectedCard(value)}>{value}</Card>))
                            }
                        </div>
                    </motion.div>
                )
            }
        </>
    )
}


export default function Cards() {
    const { typeOfPlayer } = useUserContext()
    const { averageVotes, amountOfVotes } = useClassroomContext()

    return (
        <>
            {typeOfPlayer === "player" && !averageVotes && !amountOfVotes && <CardsContent />}
        </>
    )
}
