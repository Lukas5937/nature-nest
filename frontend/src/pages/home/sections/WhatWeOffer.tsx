import Cabin from "../../../assets/home/WhatWeOffer.jpg"
import Accordion from "../components/Accordion"

export default function WhatWeOffer() {
  return (
    <section className="mx-auto my-16 w-11/12 max-w-screen-2xl rounded-3xl bg-lightMagenta px-12 py-12">
      <div className="mt-8 grid gap-4 lg:mt-12 lg:grid-cols-2 lg:gap-12">
        <div className="max-h-72 overflow-hidden rounded-3xl sm:max-h-96 lg:max-h-[36rem]">
          <img
            className="h-full w-full object-cover"
            src={Cabin}
            alt="A wooden cabin in the mountains."
          />
        </div>
        <div className="flex flex-col">
          <h2 className="mt-8 font-serif text-2xl text-magenta sm:text-4xl">
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
        </div>
      </div>
    </section>
  )
}
