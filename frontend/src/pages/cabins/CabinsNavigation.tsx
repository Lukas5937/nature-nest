import { Outlet } from "react-router-dom"
import useCabinsFilters from "./hooks/useCabinsFilters"
import useCabinsFetch from "./hooks/useCabinsFetch"

import DateInput from "./components/DateInput"
import SearchInput from "./components/SearchInput"
import SortButtons from "./components/SortButtons"
import Button from "../../UI/Button"

export default function CabinsNavigation() {
  const { data, isPending, isError, error } = useCabinsFetch()
  const {
    displayedCabins,
    activeSortMethod,
    checkInDate,
    checkOutDate,
    invalidDatesMessage,
    setActiveSortMethod,
    handleSearchValue,
    handleCheckInValue,
    handleCheckOutValue,
    handleSetBookingPeriod,
    handleResetBookingPeriod,
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
          <DateInput handleChange={handleCheckInValue} value={checkInDate} />
          <DateInput handleChange={handleCheckOutValue} value={checkOutDate} />
          {invalidDatesMessage && <p>{invalidDatesMessage}</p>}
          <Button type="button" handleClick={handleSetBookingPeriod}>
            Check availability
          </Button>
          <Button type="button" handleClick={handleResetBookingPeriod}>
            Reset
          </Button>
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
