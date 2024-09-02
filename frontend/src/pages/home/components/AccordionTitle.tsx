import { type ReactNode, useContext } from "react"
import { AccordionContext } from "./Accordion"
import { AccordionItemContext } from "./AccordionItem"

import Plus from "../../../assets/home/Plus.svg"
import Minus from "../../../assets/home/Minus.svg"

export default function AccordionTitle({ children }: { children: ReactNode }) {
  const { openItem, toggleItem } = useContext(AccordionContext)
  const { id } = useContext(AccordionItemContext)

  const isOpen = openItem === id

  return (
    <div
      className="flex justify-between gap-4 border-b-2 py-8 hover:cursor-pointer"
      onClick={() => toggleItem(id)}
    >
      <h3 className="text-xl font-light text-dark sm:text-2xl">{children}</h3>
      <img
        src={isOpen ? Minus : Plus}
        alt="Open AccordionItem Button"
        width="20px"
      />
    </div>
  )
}
