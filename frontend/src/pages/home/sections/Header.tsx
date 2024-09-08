import { useRef } from "react"
import Forest from "../../../assets/home/Forest.jpg"
import Waterfall from "../../../assets/home/Waterfall.jpg"

import { motion, useScroll, useTransform } from "framer-motion"

export default function Header() {
  const scrollRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start end", "end start"],
  })
  const moveDown = useTransform(scrollYProgress, [0, 1], [-60, 60])
  const moveUp = useTransform(scrollYProgress, [0, 1], [60, -30])
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1.2])

  return (
    <header
      ref={scrollRef}
      className="relative mx-auto w-11/12 max-w-screen-xl"
    >
      <div className="grid gap-4 pb-20 pt-8 md:min-h-screen md:grid-cols-3 md:pb-32">
        <div className="flex items-center justify-center rounded-3xl bg-dark py-8 md:col-span-2">
          <motion.h1
            className="flex font-serif text-2xl text-light md:text-4xl lg:text-5xl"
            style={{ y: moveDown, scale }}
          >
            Adventurers
          </motion.h1>
        </div>
        <div className="max-h-48 overflow-hidden rounded-3xl md:max-h-full">
          <img
            className="h-full w-full object-cover"
            src={Forest}
            alt="Forest"
          />
        </div>

        <div className="flex max-h-48 overflow-hidden rounded-3xl md:max-h-full">
          <img
            className="h-full w-full object-cover"
            src={Waterfall}
            alt="Waterfall"
          />
        </div>
        <div className="row-start-3 flex items-center justify-center rounded-3xl bg-dark py-8 md:col-span-2 md:row-start-auto">
          <motion.h2
            className="text-highlightBlue font-serif text-2xl md:text-4xl lg:text-5xl"
            style={{ y: moveUp, scale }}
          >
            Travel Wild
          </motion.h2>
        </div>
      </div>
    </header>
  )
}
