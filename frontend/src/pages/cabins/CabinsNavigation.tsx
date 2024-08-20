import { Outlet } from "react-router-dom"
import useCabinsFilters from "./hooks/useCabinsFilters"
import useCabinsFetch from "./hooks/useCabinsFetch"

import DateInput from "./components/DateInput"
import SearchInput from "./components/SearchInput"
import SortButtons from "./components/SortButtons"

export default function CabinsNavigation() {
  const { data, isPending, isError, error } = useCabinsFetch()
  const {
    displayedCabins,
    activeSortMethod,
    setActiveSortMethod,
    handleSearchValue,
    handleCheckInValue,
    handleCheckOutValue,
  } = useCabinsFilters()

  const outletContext = {
    data,
    isPending,
    isError,
    error,
    displayedCabins,
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
      <Outlet context={outletContext} />
    </main>
  )
}
