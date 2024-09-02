import { ReactNode, useContext } from "react"
import { AccordionContext } from "./Accordion"
import { AccordionItemContext } from "./AccordionItem"

export default function AccordionContent({
  children,
}: {
  children: ReactNode
}) {
  const { openItem } = useContext(AccordionContext)
  const { id } = useContext(AccordionItemContext)

  const isOpen = openItem === id

  let className = "hidden"

  if (isOpen) {
    className = "mt-4 leading-7 text-darkGreen"
  }

  return <div className={className}>{children}</div>
}
