import { ButtonAtom, Modal, RadioGroupMolecule, InputRadioAtom } from "@/system-design"
import { ModalTypes } from "../types";
import { Dispatch, FormEvent, SetStateAction } from "react";
import { useClassroomContext } from "../hooks";
import { scoringModesElements, inputName } from "../utils";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { TypeOfScores } from "@/types";


interface Inputs {
    type: TypeOfScores
}

export default function ScoringModes({ setModal }: { setModal: Dispatch<SetStateAction<ModalTypes>> }) {
    const { socket, globalTypeOfScores } = useClassroomContext()
    const { control, handleSubmit } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        socket.emit("change-type-of-score", { typeOfScores: data.type })
        setModal(null)
    }


    return (
        <Modal contentClassname="classroom__change-score">
            <Modal.Header>
                <span>Tipo de puntajes</span>
                <button className="classroom__close-icon" onClick={() => setModal(null)} aria-label="button-close">
                    <img src="/images/close.png" alt="Close icon" />
                </button>
            </Modal.Header>


            <Modal.Body className="classroom__change-score-body">
                <form onSubmit={handleSubmit(onSubmit)} className="classroom__change-score-form" role="form">

                    <RadioGroupMolecule className="classroom__change-score-radios">
                        {
                            scoringModesElements.map(({ label, value, name }) => (
                                <Controller
                                    key={value}
                                    control={control}
                                    name="type"
                                    render={({ field }) => (
                                        <InputRadioAtom
                                            onChange={field.onChange}
                                            label={label}
                                            value={value}
                                            name={name}
                                            defaultChecked={globalTypeOfScores === value}
                                        />
                                    )}
                                />
                            ))
                        }
                    </RadioGroupMolecule>
                    <ButtonAtom variant="primary">Cambiar puntajes</ButtonAtom>
                </form>
            </Modal.Body>
        </Modal>
    )
}



