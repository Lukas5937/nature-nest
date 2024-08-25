import { type ReactNode } from "react"
import { Link } from "react-router-dom"
import Back from "../assets/back.svg"

type BaseButtonProps = {
  style?: "magenta" | "green" | "back" | "modal"
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
  if (style === "green") {
    classes =
      "hover:shadow-greenButton hover:bg-greenHover rounded bg-green px-8 py-4 text-light"
  }

  if (style === "modal") {
    classes = classes =
      "rounded-md  bg-white px-4 border py-2 shadow-sm text-darkGreen"
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
      classes = "flex items-center gap-4"
      return (
        <Link className={classes} to={to}>
          <img className="h-auto w-8" src={Back} alt="back" />
          {children}
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
