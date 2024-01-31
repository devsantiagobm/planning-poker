import Image from "next/image"
import { HTMLMotionProps, motion } from "framer-motion"

interface Props extends HTMLMotionProps<"div"> {
    title: string,
    description: string
}


export default function ErrorAdvice({ title, description, ...props }: Props) {
    return (
        <motion.div {...props} title={description} className="error-advice" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="error-advice">
            <picture className="error-advice__picture">
                <Image data-testid="error-icon" src="/images/error-icon.png" alt="Error Advice Icon" width={30} height={30} />
            </picture>

            <div className="error-advice__information" >
                <strong className="error-advice__strong">{title}</strong>
                <p className="error-advice__long-text">{description}</p>
            </div>
        </motion.div>
    )
}