import { useSplitPlayers } from "../hooks"
import { useClassroomContext } from "../hooks"
import { ButtonAtom } from "@/system-design"
import { AnimatePresence, motion } from "framer-motion"
import { UserCard } from "."

export default function PokerTable() {
    const { firstHalfOfUsers, firstUser, secondHalfOfUsers, secondUser } = useSplitPlayers()
    const { socket, arePlayersReady, averageVotes, isOwner } = useClassroomContext()



    function handleRevealCards() {
        socket.emit("reveal-cards")
    }

    function handleResetMatch() {
        socket.emit("reset-classroom")
    }

    return (
        <div className="classroom__poker-table">
            <div className="classroom__board">

                <ul className="classroom__list classroom__first-line">
                    <AnimatePresence>
                        {firstHalfOfUsers.map(user => { return <UserCard  {...user} key={user._id} /> })}
                    </AnimatePresence>
                </ul>
                <ul className="classroom__list classroom__second-line">
                    <AnimatePresence>
                        {firstUser && <UserCard  {...firstUser} />}
                    </AnimatePresence>
                </ul>

                <ul className="classroom__list classroom__third-line">
                    <AnimatePresence>
                        {secondUser && <UserCard  {...secondUser} />}
                    </AnimatePresence>
                </ul>

                <ul className="classroom__list classroom__fourth-line">
                    <AnimatePresence>
                        {secondHalfOfUsers.map(user => <UserCard  {...user} key={user._id} />)}
                    </AnimatePresence>
                </ul>

                <div className="classroom__desk" data-testid="poker-desk">
                    <div className="classroom__desk-middle-line">
                        <div className="classroom__desk-inner">

                            {
                                arePlayersReady && !averageVotes && isOwner && (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                        <ButtonAtom onClick={handleRevealCards} className="classroom__reveal-cards" variant="secondary">Revelar cartas</ButtonAtom>
                                    </motion.div>
                                )
                            }
                            <AnimatePresence>
                                {
                                    isOwner && averageVotes && (
                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                            <ButtonAtom variant="secondary" className="classroom__reveal-cards" onClick={handleResetMatch}>Nueva votación</ButtonAtom>
                                        </motion.div>
                                    )
                                }
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}



