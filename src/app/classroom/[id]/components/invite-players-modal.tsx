import { InputAtom, ButtonAtom, Modal } from "@/system-design"
import { Dispatch, SetStateAction } from "react";
import { ModalTypes } from "../types";

export default function InvitePlayersModal({ setModal }: { setModal: Dispatch<SetStateAction<ModalTypes>> }) {
    const url = typeof window !== 'undefined' ? window.location.href : '';

    function handleCloseModal() {
        setModal(null)
    }

    async function handleCopyLink() {
        await navigator.clipboard.writeText(url);
    }

    return (
        <Modal>
            <Modal.Header>
                <span>Invitar jugadores</span>
                <button className="classroom__close-icon" onClick={handleCloseModal} aria-label="button-close">
                    <img src="/images/close.png" alt="Close icon" />
                </button>
            </Modal.Header>

            <Modal.Body className="classroom__invite-content">

                <InputAtom className="classroom__invite-input" id="link" value={url} disabled aria-label="copy-url-textbox"></InputAtom>
                <ButtonAtom onClick={handleCopyLink} variant="primary">Copiar link</ButtonAtom>

            </Modal.Body>

        </Modal >
    )
}