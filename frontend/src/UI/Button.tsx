import { type ReactNode } from "react"
import { Link } from "react-router-dom"
import Back from "../assets/back.svg"
import { motion } from "framer-motion"

type BaseButtonProps = {
  style?: "magenta" | "booking" | "back" | "modal" | "date" | "dateReset"
  children: ReactNode
}

type ButtonProps = BaseButtonProps & {
  type: "button"
  handleClick?: () => void
}

type LinkProps = BaseButtonProps & {
  type: "link"
  to: string
}

type ButtonComponentProps = ButtonProps | LinkProps

export default function Button(props: ButtonComponentProps) {
  const { type, children, style } = props

  let classes =
    "hover:bg-neutral-500 shadow-grayButton rounded border-2 border-light bg-neutral-400 px-8 py-4 text-light"

  if (style === "magenta") {
    classes = "hover:bg-magentaHover rounded bg-magenta px-8 py-4 text-light"
  }
  if (style === "booking") {
    classes =
      "hover:shadow-greenButton hover:bg-greenHover rounded bg-green px-6 py-3 text-light"
  }

  if (style === "modal") {
    classes = classes =
      "rounded-md  bg-white px-4 border py-2 shadow-sm text-darkGreen"
  }

  if (style === "date") {
    classes = classes =
      "w-max rounded border border-gray-300 bg-inherit px-2 py-1 text-sm text-darkGreen hover:bg-emerald-50 hover:outline hover:outline-2 hover:outline-green sm:text-base"
  }

  if (style === "dateReset") {
    classes = classes =
      "w-max rounded bg-inherit px-2 border border-gray-300 py-1 text-sm text-darkGreen hover:bg-stone-100 hover:outline hover:outline-2 hover:outline-magenta sm:text-base"
  }

  if (type === "button") {
    const { handleClick } = props as ButtonProps
    return (
      <button onClick={handleClick} className={classes}>
        {children}
        <div className=""></div>
      </button>
    )
  }

  if (type === "link") {
    const { to } = props as LinkProps
    if (style === "back") {
      classes = "inline-flex items-center justify-start gap-2"
      return (
        <Link to={to}>
          <motion.div className={classes} whileHover="hover">
            <motion.img
              className="h-auto w-8"
              src={Back}
              alt="back"
              variants={{
                hover: { x: 2 },
              }}
              transition={{ type: "tween", duration: 0.2 }}
            />
            <motion.div
              variants={{
                hover: { x: -3 },
              }}
              transition={{ type: "tween", duration: 0.2 }}
            >
              {children}
            </motion.div>
          </motion.div>
        </Link>
      )
    }
    return (
      <Link className={classes} to={to}>
        {children}
      </Link>
    )
  }
}
