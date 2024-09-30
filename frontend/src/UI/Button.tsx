import { type ReactNode } from "react"
import { Link } from "react-router-dom"
import Back from "../assets/back.svg"
import { motion } from "framer-motion"

type BaseButtonProps = {
  style:
    | "magenta"
    | "booking"
    | "back"
    | "modal"
    | "modalConfirm"
    | "modalDelete"
    | "date"
    | "dateReset"
    | "cancel"
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

  let classes

  if (style === "magenta") {
    classes = "rounded bg-magenta px-8 py-4 text-light hover:bg-magentaHover"
  }
  if (style === "booking") {
    classes =
      " rounded bg-green px-6 py-3 text-light hover:shadow-greenButton hover:bg-greenHover"
  }

  if (style === "modal") {
    classes = classes =
      "flex rounded-md border bg-white px-4 py-2 text-darkGreen shadow-sm"
  }

  if (style === "modalConfirm") {
    classes = classes =
      "rounded-md border bg-white px-4 py-2 text-darkGreen shadow-sm hover:bg-emerald-50 hover:outline hover:outline-2 hover:outline-green"
  }

  if (style === "modalDelete") {
    classes = classes =
      "flex rounded-md border bg-white px-4 py-2 text-darkGreen shadow-sm hover:bg-red-50"
  }

  if (style === "date") {
    classes =
      "rounded border border-gray-300 bg-inherit px-2 py-1 text-sm text-darkGreen hover:bg-emerald-50 sm:text-base"
  }

  if (style === "dateReset") {
    classes =
      "rounded bg-inherit px-2 border border-gray-300 py-1 text-sm text-darkGreen hover:bg-red-50 sm:text-base" // Alternativ: hover:bg-[#E6B0AA]
  }

  if (style === "cancel") {
    classes =
      "bg-darkGreen text-light px-4 py-1.5 rounded-md hover:outline hover:shadow-magentaButton w-full xs:w-auto md:text-base"
  }

  if (type === "button") {
    const { handleClick } = props as ButtonProps
    return (
      <button onClick={handleClick} className={classes}>
        {children}
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
              alt=""
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
