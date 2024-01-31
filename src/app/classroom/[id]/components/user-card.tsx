import { LetterAvatar, Card } from "@/system-design"
import { getFirstLetters } from "../utils/get-first-letters"
import { TwoLetterString, FullPlayer } from "@/types"
import { useClassroomContext } from "../hooks"
import { AnimatePresence, motion } from "framer-motion"
import { Modal, ButtonAtom } from "@/system-design"
import { useState } from "react"

export default function UserCard({ username, socketID, type, vote }: FullPlayer) {
    const firstLetters = getFirstLetters(username)
    const { socket, averageVotes, isOwner, owners } = useClassroomContext()
    const [confirmationModal, setConfirmationModal] = useState(false)


    //isOwner is based in the user that is using the app. currentUserIsOwner is based in the user that is rendering via the lists in the PokerTable component

    const isCurrentPlayer = socket.id === socketID
    const currentUserIsOwner = owners.includes(socketID)

    function handleOpenModal({ username, socketID }: { username: string, socketID: string }) {
        if (isOwner && !currentUserIsOwner) {
            setConfirmationModal(true)
        }
    }

    function giveAdmin() {
        socket.emit("add-admin", { socketID })
        setConfirmationModal(false)
    }


    const getCardClasses = () => {
        const base = "classroom__player-card";
        const giveAdmin = isOwner && !currentUserIsOwner ? " classroom__player-card--give-admin" : "";
        const playerVoted = vote && !averageVotes ? " classroom__player-card--voted" : "";

        return `${base}${playerVoted}${giveAdmin}`;
    };

    return (
        <motion.li className="classroom__item" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>

            {
                type === "player" && (
                    <Card onClick={() => handleOpenModal({ username, socketID })} className={getCardClasses()} >
                        <AnimatePresence>
                            {averageVotes && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>{vote}</motion.span>}
                        </AnimatePresence>
                    </Card>
                )
            }
            {
                type === "viewer" && (
                    <LetterAvatar onClick={() => handleOpenModal({ username, socketID })}
                        className={`classroom__letter-avatar ${isOwner && !currentUserIsOwner && "classroom__letter-avatar--give-admin"}`}
                        variant="big" letters={firstLetters as TwoLetterString} />
                )
            }

            <span className={`classroom__username ${isCurrentPlayer && "classroom__username--current"}`}>
                {
                    currentUserIsOwner && (<motion.img initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="classroom__owner-icon" src="/images/crown.png" alt="Key icon" />)
                }

                <span className="classroom__username-text">{username}</span>

            </span>

            <AnimatePresence>
                {
                    confirmationModal && (
                        <Modal>
                            <Modal.Header>
                                <span>Confirmación</span>
                                <button className="classroom__close-icon" onClick={() => setConfirmationModal(false)}>
                                    <img src="/images/close.png" alt="Close icon" />
                                </button>
                            </Modal.Header>

                            <Modal.Body className="classroom__confirm-admin-body">
                                <span className="classroom__confirm-admin-message">¿Dar rol administrador a <strong>{username}</strong>?</span>
                                <ButtonAtom variant="primary" className="classroom__confirm-admin-button" onClick={giveAdmin}>Confirmar</ButtonAtom>
                            </Modal.Body>
                        </Modal>
                    )
                }
            </AnimatePresence>


        </motion.li>
    )
}


