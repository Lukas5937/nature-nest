import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

import Cabin from "../../../assets/home/WhatWeOffer.jpg"
import Accordion from "../components/Accordion"

export default function WhatWeOffer() {
  const scrollRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start end", "end start"],
  })

  const moveDown = useTransform(scrollYProgress, [0, 0.7], [-70, 0])

  ;("text-xl font-light text-dark sm:text-2xl")
  return (
    <section ref={scrollRef} className="bg-bgMagenta">
      <div className="grid grid-cols-1 grid-rows-1 gap-4 lg:grid-cols-2">
        <div className="relative col-span-full row-span-full h-[600px] lg:col-span-1 lg:h-screen">
          <img
            className="h-full w-full object-cover"
            src={Cabin}
            alt="A wooden cabin on a large meadow in the mountains."
          />
          <div className="absolute bottom-0 left-0 right-0 top-0 z-10 bg-[#7E727670] lg:hidden"></div>
        </div>
        <motion.div
          className="relative z-20 col-span-full row-span-full mx-8 mt-16 flex flex-col text-light lg:col-span-1 lg:row-start-auto lg:mt-0 lg:py-32 lg:text-text"
          style={{ y: moveDown }}
        >
          <h2 className="font-serif text-2xl text-magenta sm:text-4xl">
            What we offer
          </h2>
          <Accordion>
            <Accordion.Item id="offbeat">
              <Accordion.Title>Offbeat Destinations</Accordion.Title>
              <Accordion.Content>
                <p>
                  Discover hidden gems away from the crowds. Our offbeat
                  destinations offer an authentic escape into untouched
                  landscapes where adventure awaits at every turn. Find serenity
                  in secluded spots that promise unique experiences and
                  unforgettable memories.
                </p>
              </Accordion.Content>
            </Accordion.Item>
            <Accordion.Item id="comfort">
              <Accordion.Title>Comfort Meets Rustic Charm</Accordion.Title>
              <Accordion.Content>
                <p>
                  Experience the perfect blend of modern comforts and rustic
                  elegance. Each cabin is thoughtfully designed with cozy
                  interiors and stylish amenities, ensuring you enjoy a
                  comfortable stay while being immersed in the natural beauty
                  surrounding you.
                </p>
              </Accordion.Content>
            </Accordion.Item>
            <Accordion.Item id="tailored">
              <Accordion.Title>Tailored Adventure Experiences</Accordion.Title>
              <Accordion.Content>
                <p>
                  From guided hikes to wildlife spotting, we offer a range of
                  curated activities to enhance your stay. Whether you're
                  seeking thrilling adventures or tranquil moments of
                  reflection, our bespoke experiences are designed to match your
                  adventurous spirit.
                </p>
              </Accordion.Content>
            </Accordion.Item>
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
