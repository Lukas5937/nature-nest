import { createContext, useState, type ReactNode } from "react"

import AccordionItem from "./AccordionItem"
import AccordionTitle from "./AccordionTitle"
import AccordionContent from "./AccordionContent"

type AccordionContextValue = {
  openItem: string | null
  toggleItem: (item: string) => void
}

export const AccordionContext = createContext<AccordionContextValue>({
  openItem: null,
  toggleItem: () => {},
})

export default function Accordion({ children }: { children: ReactNode }) {
  const [openItem, setOpenItem] = useState<string | null>(null)

  function toggleItem(item: string) {
    setOpenItem((prevItem) => (prevItem === item ? null : item))
  }

  const value = {
    openItem,
    toggleItem,
  }
  return (
    <AccordionContext.Provider value={value}>
      <div className="my-6 lg:mt-12">{children}</div>
    </AccordionContext.Provider>
  )
}

Accordion.Item = AccordionItem
Accordion.Title = AccordionTitle
Accordion.Content = AccordionContent
