import { Children, ReactNode, cloneElement, ReactElement, ComponentProps } from "react";
import { MotionProps, motion, HTMLMotionProps } from "framer-motion"


interface Props extends ComponentProps<"div"> {
    contentClassname?: string
}

export default function Modal({ children, contentClassname, ...props }: Props & MotionProps) {
    return (
        <motion.div className="modal" variants={variants} initial="initial" animate="animate" exit="exit" {...props as HTMLMotionProps<"div">} role="modal">

            <div className={`modal__content ${contentClassname}`}>
                {
                    Children.map(children, (child) => {
                        return cloneElement(child as ReactElement<ReactNode>)
                    })
                }

            </div>
        </motion.div>
    )
}

const variants = {
    initial: {
        opacity: 0
    },
    animate: {
        opacity: 1
    },
    exit: {
        opacity: 0
    }
}


function Header({ children, ...props }: Props & ComponentProps<"div">) {
    return (
        <header className="modal__header" {...props}>
            {children}
        </header>
    )
}

function Body({ children, className, ...props }: Props & ComponentProps<"div">) {
    return (
        <div className={`modal__body ${className}`} {...props}>
            {
                children
            }
        </div>
    )
}

Modal.Header = Header
Modal.Body = Body
