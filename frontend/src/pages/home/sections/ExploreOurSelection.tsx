import Button from "../../../UI/Button"

export default function ExploreOurSelection() {
  return (
    <section className="mx-auto my-16 w-11/12 max-w-screen-sm text-center md:my-28">
      <h2 className="px-4 text-center font-serif text-4xl text-dark md:text-5xl">
        Explore our selection
      </h2>
      <p className="mb-8 mt-6 text-magenta sm:text-lg">
        Ready to embark on your next adventure? Choose from our selection of
        cozy, rustic cabins nestled in the heart of nature. Whether you're
        seeking tranquility or excitement, we've got the perfect cabin for you.
      </p>
      <Button type="link" style="magenta" to="/cabins">
        Book Your Cabin
      </Button>
    </section>
  )
}
