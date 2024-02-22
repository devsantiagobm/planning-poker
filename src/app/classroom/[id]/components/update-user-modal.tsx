import { Modal, ButtonAtom, InputRadioAtom, RadioGroupMolecule } from "@/system-design"
import { useUserContext, useClassroomContext } from "../hooks"
import { ModalTypes, TypeOfPlayers } from "../types"
import { InputRadio } from "@/types"
import { Dispatch, SetStateAction, useState } from "react"
import { useForm, Controller, SubmitHandler } from "react-hook-form"

interface Inputs {
    type: TypeOfPlayers
}

export default function UpdateUserModal({ setModal }: { setModal: Dispatch<SetStateAction<ModalTypes>> }) {
    const { typeOfPlayer, setTypeOfPlayer } = useUserContext()
    const { socket } = useClassroomContext()
    const { control, handleSubmit } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = ({ type }) => {
        socket.emit("update-player", { type })
        setModal(null)
        setTypeOfPlayer(type)
    }


    return (
        <Modal contentClassname="classroom__new-user-box-modal">

            <Modal.Header>
                <span>Cambiar modo de visualización</span>
                <button className="classroom__close-icon" onClick={() => setModal(null)} aria-label="button-close">
                    <img src="/images/close.png" alt="Close icon" />
                </button>
            </Modal.Header>

            <Modal.Body className="classroom__change-score-body">
                <form onSubmit={handleSubmit(onSubmit)} className="classroom__update-user-form" role="form">

                    <RadioGroupMolecule>
                        {
                            inputRadios.map(({ value, label }) => (
                                <Controller
                                    key={value}
                                    control={control}
                                    name="type"
                                    rules={{ required: "Este campo es obligatorio" }}
                                    render={({ field }) => (
                                        <InputRadioAtom
                                            onChange={field.onChange}
                                            label={label}
                                            name="type"
                                            value={value}
                                            defaultChecked={typeOfPlayer === value}
                                        />
                                    )}
                                />
                            ))
                        }

                    </RadioGroupMolecule>
                    <ButtonAtom variant="primary" className="classroom__submit">Cambiar</ButtonAtom>
                </form>
            </Modal.Body>
        </Modal>
    )
}


interface CustomInputRadio extends Omit<InputRadio, "name"> {
    value: TypeOfPlayers
}


const inputRadios: CustomInputRadio[] = [
    {
        label: "Jugador",
        value: "player",
    },
    {
        label: "Espectador",
        value: "viewer",
    },
]
