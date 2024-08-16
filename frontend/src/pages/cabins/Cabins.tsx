import { useQuery } from "@tanstack/react-query"
import { fetchCabins } from "../../http"
import { type Cabin, type FetchError } from "../../http"
import CabinCard from "./components/CabinCard"
import WhisperingPinesCabin from "../../assets/WhisperingPinesCabin.jpeg"

export default function Cabins() {
  const { data, isPending, isError, error } = useQuery<Cabin[], FetchError>({
    queryKey: ["cabins"],
    queryFn: fetchCabins,
  })

  let content

  if (data) {
    content = (
      <ul className="grid gap-12 sm:grid-cols-2 md:grid-cols-3">
        {data.map((cabin) => {
          return (
            <li key={cabin._id}>
              <CabinCard cabin={cabin} img={WhisperingPinesCabin} />
            </li>
          )
        })}
      </ul>
    )
  }

  return (
    <main className="mx-auto my-8 w-11/12 max-w-screen-xl">
      <section className="mx-auto max-w-screen-2xl rounded-3xl bg-lightMagenta px-12 py-12">
        {content}
      </section>
    </main>
  )
}
