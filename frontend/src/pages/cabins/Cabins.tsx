import { useQuery } from "@tanstack/react-query"
import { fetchCabins } from "../../http"
import { type Cabin, type FetchError } from "../../http"
import useCabinsFilters from "./hooks/useCabinsFilters"

import CabinCard from "./components/CabinCard"
import { CircularProgress } from "@mui/material"
import FetchErrorBox from "../../UI/FetchErrorBox"
import WhisperingPinesCabin from "../../assets/WhisperingPinesCabin.jpeg"
import DateInput from "./components/DateInput"
import SearchInput from "./components/SearchInput"

export default function Cabins() {
  const { data, isPending, isError, error } = useQuery<Cabin[], FetchError>({
    queryKey: ["cabins"],
    queryFn: fetchCabins,
  })

  const {
    occupiedDates,
    handleSearchValue,
    handleCheckInValue,
    handleCheckOutValue,
    filterResults,
  } = useCabinsFilters()

  console.log(occupiedDates)

  let searchResults
  if (data) {
    searchResults = filterResults(data)
  }

  if (isError) {
    return <FetchErrorBox error={error} />
  }

  return (
    <main className="mx-auto my-8 w-11/12 max-w-screen-xl">
      <SearchInput handleChange={handleSearchValue} />
      <DateInput handleChange={handleCheckInValue} />
      <DateInput handleChange={handleCheckOutValue} />
      {isPending && (
        <>
          <p>Loading...</p>
          <CircularProgress />
        </>
      )}
      {data && (
        <section className="mx-auto max-w-screen-2xl rounded-3xl bg-lightMagenta px-12 py-12">
          <ul className="grid gap-12 sm:grid-cols-2 md:grid-cols-3">
            {searchResults &&
              searchResults.map((result) => (
                <li key={result._id}>
                  <CabinCard cabin={result} img={WhisperingPinesCabin} />
                </li>
              ))}
          </ul>
        </section>
      )}
    </main>
  )
}
