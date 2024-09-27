import { type ReactNode, useContext } from "react"
import { AccordionContext } from "./Accordion"
import { AccordionItemContext } from "./AccordionItem"

import MinusIcon from "../../../assets/home/MinusIcon"
import PlusIcon from "../../../assets/home/PlusIcon"

export default function AccordionTitle({ children }: { children: ReactNode }) {
  const { openItem, toggleItem } = useContext(AccordionContext)
  const { id } = useContext(AccordionItemContext)

  const isOpen = openItem === id

  return (
    <div
      className="flex justify-between gap-4 border-b-2 py-6 hover:cursor-pointer md:py-8"
      onClick={() => toggleItem(id)}
    >
      <h3 className="text-xl font-light text-light sm:text-2xl lg:text-dark">
        {children}
      </h3>
      {isOpen ? <MinusIcon /> : <PlusIcon />}
    </div>
  )
}
