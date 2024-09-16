import { useOutletContext } from "react-router-dom"
import { type Cabin, type FetchError } from "../../util/http"
import useImageURLs from "../../hooks/useImageUrls"

import CabinCard from "./components/CabinCard"
import FetchErrorBox from "../../UI/FetchErrorBox"

export default function Cabins() {
  const { data, isPending, isError, error, displayedCabins } =
    useOutletContext<{
      data: Cabin[]
      isPending: boolean
      isError: boolean
      error: FetchError
      displayedCabins: Cabin[]
    }>()

  const { createCoverImageUrl } = useImageURLs()

  if (isError && error) {
    return <FetchErrorBox error={error} />
  }

  return (
    <section className="mx-auto max-w-screen-2xl">
      {isPending && (
        <div className="flex w-full items-center justify-center gap-2">
          <p>Loading...</p>
        </div>
      )}
      {data && displayedCabins.length === 0 && (
        <p className="mt-8 text-lg font-semibold">
          No cabins match your search criteria. Please try adjusting your
          filters.
        </p>
      )}
      {data && (
        <ul className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
          {displayedCabins.map((cabin) => {
            const coverImageUrl = createCoverImageUrl(cabin)
            return (
              <li key={cabin._id}>
                <CabinCard cabin={cabin} img={coverImageUrl} />
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}
