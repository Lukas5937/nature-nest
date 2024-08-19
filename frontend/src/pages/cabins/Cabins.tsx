import useCabinsFetch from "./hooks/useCabinsFetch"
import useCabinsFilters from "./hooks/useCabinsFilters"

import CabinCard from "./components/CabinCard"
import { CircularProgress } from "@mui/material"
import FetchErrorBox from "../../UI/FetchErrorBox"
import WhisperingPinesCabin from "../../assets/WhisperingPinesCabin.jpeg"
import DateInput from "./components/DateInput"
import SearchInput from "./components/SearchInput"
import SortButtons from "./components/SortButtons"

export default function Cabins() {
  const { data, isPending, isError, error } = useCabinsFetch()

  const {
    displayedCabins,
    activeSortMethod,
    setActiveSortMethod,
    handleSearchValue,
    handleCheckInValue,
    handleCheckOutValue,
  } = useCabinsFilters()

  if (isError && error) {
    return <FetchErrorBox error={error} />
  }

  return (
    <main className="mx-auto my-8 grid w-11/12 max-w-screen-xl grid-cols-[max-content_1fr] gap-4">
      <section className="sticky top-8 flex h-max flex-col gap-12">
        <SearchInput handleChange={handleSearchValue} />
        <div className="flex flex-col gap-4">
          <DateInput handleChange={handleCheckInValue} />
          <DateInput handleChange={handleCheckOutValue} />
        </div>
        <SortButtons
          activeSortMethod={activeSortMethod}
          setActiveSortMethod={setActiveSortMethod}
        />
      </section>
      {isPending && (
        <>
          <p>Loading...</p>
          <CircularProgress />
        </>
      )}
      {data && (
        <section className="mx-auto max-w-screen-2xl rounded-3xl bg-lightMagenta px-12 py-12">
          <ul className="grid gap-12 sm:grid-cols-2 md:grid-cols-3">
            {displayedCabins &&
              displayedCabins.map((cabin) => (
                <li key={cabin._id}>
                  <CabinCard cabin={cabin} img={WhisperingPinesCabin} />
                </li>
              ))}
          </ul>
        </section>
      )}
    </main>
  )
}
