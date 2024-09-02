import { createContext, ReactNode } from "react"

type AccordionItemContextValue = {
  id: string
}

export const AccordionItemContext = createContext<AccordionItemContextValue>({
  id: "",
})

type AccordionItemProps = {
  id: string
  children: ReactNode
}

export default function AccordionItem({ id, children }: AccordionItemProps) {
  const className = "list-none"

  return (
    <>
      <AccordionItemContext.Provider value={{ id }}>
        <li className={className}>{children}</li>
      </AccordionItemContext.Provider>
    </>
  )
}
