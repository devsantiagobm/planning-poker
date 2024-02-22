"use client";
import Image from "next/image"
import { InputAtom, ButtonAtom, ErrorAdvice, Loader } from "@/system-design"
import { AnimatePresence } from "framer-motion";
import { useCreateClassroom } from "./hooks/use-create-classroom";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { validateGenericInput } from "@/helpers";

type Inputs = {
    name: string,
};

const inputs: Inputs = {
    "name": "name"
}

export function customValidate(value: string) {
    const isWrong = validateGenericInput(value)

    if (isWrong) {
        return "Ingresa un texto de 5 a 20 caracteres, sin caracteres especiales y con máximo 3 números";
    }
}

export default function NewMatch() {
    const { watch, handleSubmit, control, formState: { errors } } = useForm<Inputs>();
    const { createClassroom, loading, error } = useCreateClassroom()


    const onSubmit: SubmitHandler<Inputs> = ({name}) => {
        createClassroom(name)
    };

    return (
        <main className="new-match">
            <header className="new-match__header">
                <div className="new-match__header__box">
                    <Image src="/images/pragma-logo.png" width={60} height={60} alt="Pragma logo"></Image>
                    <span className="new-match__header__title" data-testid="create-match-title">Crear partida</span>
                </div>

            </header>
            <main className="new-match__main">
                <form className="new-match__form" onSubmit={handleSubmit(onSubmit)} role="form">
                    <Controller name="name" control={control} defaultValue="" rules={{ validate: customValidate }} render={({ field }) => (
                        <InputAtom
                            id={inputs.name}
                            label="Nombra la partida"
                            value={field.value}
                            onChange={field.onChange}
                        />
                    )} />

                    <ButtonAtom isActive={Boolean(watch("name")) && Object.entries(errors).length === 0} variant="primary" className="new-match__submit">
                        {loading ? <Loader role="loader" className="new-match__loader" /> : "Crear partida"}
                    </ButtonAtom>


                    <AnimatePresence>
                        {
                            errors.name?.message && <ErrorAdvice role="error-advice" title="Formato incorrecto" description={errors.name.message} />
                        }
                    </AnimatePresence>

                    <AnimatePresence>
                        {
                            !errors.name?.message && error && <ErrorAdvice role="error-advice" title="Ups! Ocurrió un error desconocido" description={"Mensaje de error: " + error} />
                        }
                    </AnimatePresence>

                </form>
            </main>
        </main>
    )
}


