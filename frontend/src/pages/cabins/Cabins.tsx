import { useOutletContext } from "react-router-dom"

import { type Cabin, type FetchError } from "../../util/http"

import CabinCard from "./components/CabinCard"
import { CircularProgress } from "@mui/material"
import FetchErrorBox from "../../UI/FetchErrorBox"
import WhisperingPinesCabin from "../../assets/WhisperingPinesCabin.jpeg"

export default function Cabins() {
  const { data, isPending, isError, error, displayedCabins } =
    useOutletContext<{
      data: Cabin[]
      isPending: boolean
      isError: boolean
      error: FetchError
      displayedCabins: Cabin[]
    }>()

  if (isError && error) {
    return <FetchErrorBox error={error} />
  }
  return (
    <section className="mx-auto max-w-screen-2xl">
      {isPending && (
        <>
          <p>Loading...</p>
          <CircularProgress />
        </>
      )}
      {data && displayedCabins.length === 0 && (
        <p className="mt-8 text-lg font-semibold">
          No cabins match your search criteria. Please try adjusting your
          filters.
        </p>
      )}
      {data && (
        <ul className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
          {displayedCabins.map((cabin) => (
            <li key={cabin._id}>
              <CabinCard cabin={cabin} img={WhisperingPinesCabin} />
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
