import { Card } from "@/system-design"
import { useClassroomContext } from "../hooks"
import { AnimatePresence, motion } from "framer-motion"

export default function ResultOfVotes() {
    const { amountOfVotes, averageVotes } = useClassroomContext()

    return (
        <>
            <AnimatePresence>
                {
                    amountOfVotes && averageVotes && <ResultOfVotesContent />
                }
            </AnimatePresence>
        </>
    )
}


function ResultOfVotesContent() {
    const { amountOfVotes, averageVotes } = useClassroomContext()

    return (
        <motion.div className="classroom__result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} role="result-of-votes">
            <ul className="classroom__cards-result">
                {
                    amountOfVotes?.map(({ times, label }) => (
                        <li key={label} className="classroom__card-result-box">
                            <Card variant="big" className="classroom__card-result">{label}</Card>
                            <span className="classroom__amount-of-votes">{times} Voto</span>
                        </li>
                    ))
                }


            </ul>
            {
                averageVotes && (
                    <div className="classroom__average-box">
                        <div className="classroom__average-text">Promedio: </div>
                        <span className="classroom__average-number">{averageVotes}</span>
                    </div>
                )
            }


        </motion.div>
    )
}
