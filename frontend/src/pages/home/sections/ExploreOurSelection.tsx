import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

import Button from "../../../UI/Button"

export default function ExploreOurSelection() {
  const scrollRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start end", "end start"],
  })

  const moveDown = useTransform(scrollYProgress, [0, 0.5], [-30, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1])

  return (
    <section
      ref={scrollRef}
      className="relative mx-auto my-16 w-11/12 max-w-screen-sm text-center md:my-28"
    >
      <motion.div style={{ y: moveDown, scale }}>
        <h2 className="px-4 text-center font-serif text-4xl text-dark md:text-5xl">
          Explore our selection
        </h2>
        <p className="mb-8 mt-6 text-magenta sm:text-lg">
          Ready to embark on your next adventure? Choose from our selection of
          cozy, rustic cabins nestled in the heart of nature. Whether you're
          seeking tranquility or excitement, we've got the perfect cabin for
          you.
        </p>
        <Button type="link" style="magenta" to="/cabins">
          Book Your Cabin
        </Button>
      </motion.div>
    </section>
  )
}
