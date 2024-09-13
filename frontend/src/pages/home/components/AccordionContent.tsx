import { ReactNode, useContext } from "react"
import { AccordionContext } from "./Accordion"
import { AccordionItemContext } from "./AccordionItem"
import { motion, AnimatePresence } from "framer-motion"

export default function AccordionContent({
  children,
}: {
  children: ReactNode
}) {
  const { openItem } = useContext(AccordionContext)
  const { id } = useContext(AccordionItemContext)

  const isOpen = openItem === id

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="mt-4 overflow-hidden leading-7"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
