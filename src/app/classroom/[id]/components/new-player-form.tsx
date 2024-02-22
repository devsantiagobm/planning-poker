import { Params } from "../types"
import { useClassroomContext, useUserContext } from "../hooks"
import { InputAtom, ButtonAtom, InputRadioAtom, RadioGroupMolecule } from "@/system-design"
import { InputRadio } from "@/types";
import { TypeOfPlayers } from "../types";
import { AnimatePresence, motion } from "framer-motion"
import { Modal } from "@/system-design";
import { ErrorAdvice } from "@/system-design";
import { validateGenericInput } from "@/helpers";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

interface Inputs {
    username: string
    type: TypeOfPlayers
}

export function customValidate(value: string) {
    const isWrong = validateGenericInput(value)
    if (isWrong) return "Ingresa un texto de 5 a 20 caracteres, sin caracteres especiales y con máximo 3 números";
}

export default function NewPlayerForm({ params }: Params) {
    const { isUserCreated } = useClassroomContext()
    const { socket, setIsUserCreated } = useClassroomContext()
    const { setUsername, setTypeOfPlayer } = useUserContext()
    const { watch, control, handleSubmit, formState: { errors } } = useForm<Inputs>()


    const onSubmit: SubmitHandler<Inputs> = ({ username, type }) => {
        socket.emit("join-classroom", { username, type, roomID: params.id })
        setIsUserCreated(true)


        setUsername(username)
        setTypeOfPlayer(type)
    }

    return (
        <AnimatePresence>
            {!isUserCreated && (
                <Modal contentClassname="classroom__new-user-box-modal" data-testid="new-player-form">
                    <Modal.Body>

                        <AnimatePresence>
                            {
                                Object.keys(errors).length > 0 && <ErrorAdvice key={Object.keys(errors)[0][0]} title="Campos obligatorios" description={Object.entries(errors)[0][1].message as string} />
                            }
                        </AnimatePresence>

                        <motion.form role="form" className="classroom__form" onSubmit={handleSubmit(onSubmit)} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .4 }}>
                            <Controller
                                defaultValue=""
                                name="username"
                                control={control}
                                rules={{ validate: customValidate }}
                                render={({ field }) => (
                                    <InputAtom value={field.value} onChange={field.onChange} id={"username"} label="Tu nombre" />
                                )}

                            />

                            <RadioGroupMolecule>
                                {
                                    inputRadios.map(({ label, value }) => (
                                        <Controller
                                            key={value}
                                            name="type"
                                            control={control}
                                            rules={{ required: "Elige un tipo de jugador para poder ingresar" }}
                                            render={({ field }) => (
                                                <InputRadioAtom
                                                    onChange={field.onChange}
                                                    value={value}
                                                    name="type"
                                                    label={label}
                                                />
                                            )}
                                        />
                                    ))
                                }
                            </RadioGroupMolecule>

                            <ButtonAtom isActive={Boolean(watch("username")) && Boolean(watch("type")) && Object.entries(errors).length === 0} variant="primary" className="classroom__submit">Continuar</ButtonAtom>
                        </motion.form>
                    </Modal.Body>
                </Modal>
            )
            }
        </AnimatePresence >

    )
}

// We need to change the InputRadio interface because in this case we need the value key beign only of type TypeOfPlayers
interface TypeOfPlayersInputRadio extends Omit<InputRadio, "name"> {
    value: TypeOfPlayers
}

const inputRadios: TypeOfPlayersInputRadio[] = [
    {
        label: "Jugador",
        value: "player",
    },
    {
        label: "Espectador",
        value: "viewer",
    },
]