import { type ReactNode } from "react"
import { Link } from "react-router-dom"

type BaseButtonProps = {
  color?: "magenta" | "green"
  children: ReactNode
}

type ButtonProps = BaseButtonProps & {
  type: "button"
}

type LinkProps = BaseButtonProps & {
  type: "link"
  to: string
}

type ButtonComponentProps = ButtonProps | LinkProps

export default function Button(props: ButtonComponentProps) {
  const { type, color, children } = props

  if (type === "button") {
    return (
      <button className="hover:bg-grey-500 shadow-grayButton rounded border-2 border-light bg-gray-400 px-8 py-4 text-light">
        {children}
      </button>
    )
  }
  let styles =
    "hover:bg-neutral-500 shadow-grayButton rounded border-2 border-light bg-neutral-400 px-8 py-4 text-light"

  if (color === "magenta") {
    styles = "hover:bg-magentaHover rounded bg-magenta px-8 py-4 text-light"
  }
  if (color === "green") {
    styles =
      "hover:shadow-greenButton hover:bg-greenHover rounded bg-green px-8 py-4 text-light"
  }

  if (type === "link") {
    const { to } = props as LinkProps
    return (
      <Link className={styles} to={to}>
        {children}
      </Link>
    )
  }
}
