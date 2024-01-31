import { Modal, ButtonAtom } from "@/system-design"
import { useClassroomContext } from "../hooks"

export default function FullMatchModal() {
    const { fullMatch } = useClassroomContext()


    return (
        <>
            {
                fullMatch && (
                    <Modal>
                        <Modal.Body className="full-match-modal__body">
                            <span className="full-match-modal__text">Ups! Parece que esta sala está llena. Intentalo más tarde</span>
                            <ButtonAtom onClick={() => location.reload()} variant="primary">Refrescar página</ButtonAtom>
                        </Modal.Body>
                    </Modal>
                )}
        </>
    )
}