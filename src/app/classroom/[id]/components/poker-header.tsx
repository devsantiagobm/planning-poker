import { ButtonAtom, LetterAvatar } from "@/system-design"
import Image from "next/image"
import { useClassroomContext, useUserContext } from "../hooks"
import { getFirstLetters } from "../utils/get-first-letters"
import { InvitePlayersModal, ScoringModes, UpdateUserModal } from "."
import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ModalTypes } from "../types"

export default function PokerHeader() {
    const [modal, setModal] = useState<ModalTypes>(null)
    const [menu, setMenu] = useState(false)
    const { classroomName, isOwner, averageVotes } = useClassroomContext()
    const { username } = useUserContext()
    const firstLettersOfName = getFirstLetters(username)


    return (
        <header className="classroom__header">

            <picture className="classroom__picture">
                <Image className="classroom__image" src="/images/pragma-logo.png" width={60} height={60} alt="Pragma logo" role="pragma-logo"/>
            </picture>


            <h1 className="classroom__title" role="title">{classroomName}</h1>

            <div className={`classroom__buttons-box ${menu && "classroom__buttons-box--active"}`}>

                <AnimatePresence>
                    {
                        !averageVotes && isOwner && (
                            <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="classroom__change-score-button" onClick={() => setModal("change-score")} role="change-score-button">
                                <picture className="classroom__cards-icon">
                                    <img src="/images/poker-cards.png" alt="Settings icon" />
                                </picture>
                            </motion.button>
                        )
                    }
                </AnimatePresence>
                {
                    username && <button className="classroom__update-user-icon" onClick={() => setModal("update-user")} role="edit-user"><LetterAvatar letters={firstLettersOfName} /></button>
                }


                <ButtonAtom className="classroom__invite-players" onClick={() => setModal("invite-players")} variant="third">Invitar jugadores</ButtonAtom>



            </div>

            <div className="classroom__menu-handler">
                <button className="classroom__menu-button" role="menu-handler" onClick={() => setMenu(!menu)}>
                    <img src="/images/menu.png" alt="Menu icon" />
                </button>
            </div>

            <AnimatePresence>
                {
                    modal === "change-score" && <ScoringModes setModal={setModal} />
                }
            </AnimatePresence>

            <AnimatePresence>
                {
                    modal === "invite-players" && <InvitePlayersModal setModal={setModal} />
                }
            </AnimatePresence>

            <AnimatePresence>
                {
                    modal === "update-user" && <UpdateUserModal setModal={setModal} />
                }
            </AnimatePresence>


        </header>
    )
}


