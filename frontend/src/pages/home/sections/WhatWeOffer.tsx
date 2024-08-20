import Cabin from "../../../assets/home/WhatWeOffer.jpg"

export default function WhatWeOffer() {
  return (
    <section className="mx-auto my-16 w-11/12 max-w-screen-2xl rounded-3xl bg-lightMagenta px-12 py-12">
      <h2 className="text-center font-serif text-3xl text-magenta sm:text-4xl md:text-5xl">
        What we offer
      </h2>
      <div className="mt-8 grid gap-4 lg:mt-12 lg:grid-cols-2 lg:gap-12">
        <div className="max-h-72 overflow-hidden rounded-3xl sm:max-h-96 lg:max-h-[44rem]">
          <img
            className="h-full w-full object-cover"
            src={Cabin}
            alt="A wooden cabin in the mountains."
          />
        </div>
        <div className="flex flex-col justify-center">
          <h3 className="mt-4 text-2xl font-light text-dark md:text-3xl lg:mt-0">
            Offbeat Destinations
          </h3>
          <p className="text-darkGreen mt-2 leading-7">
            Discover hidden gems away from the crowds. Our offbeat destinations
            offer an authentic escape into untouched landscapes where adventure
            awaits at every turn. Find serenity in secluded spots that promise
            unique experiences and unforgettable memories.
          </p>
          <h3 className="mt-10 text-2xl font-light text-dark md:text-3xl">
            Comfort Meets Rustic Charm
          </h3>
          <p className="text-darkGreen mt-2 leading-7">
            Experience the perfect blend of modern comforts and rustic elegance.
            Each cabin is thoughtfully designed with cozy interiors and stylish
            amenities, ensuring you enjoy a comfortable stay while being
            immersed in the natural beauty surrounding you.
          </p>
          <h3 className="mt-10 text-2xl font-light text-dark md:text-3xl">
            Tailored Adventure Experiences
          </h3>
          <p className="text-darkGreen mt-2 leading-7">
            From guided hikes to wildlife spotting, we offer a range of curated
            activities to enhance your stay. Whether you're seeking thrilling
            adventures or tranquil moments of reflection, our bespoke
            experiences are designed to match your adventurous spirit.
          </p>
        </div>
      </div>
    </section>
  )
}
