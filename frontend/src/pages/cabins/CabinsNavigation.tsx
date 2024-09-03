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
    <main className="mx-auto my-8 grid w-11/12 max-w-screen-xl grid-cols-[max-content_1fr] gap-12">
      <section className="sticky top-8 flex h-max flex-col gap-12">
        <SearchInput handleChange={handleSearchValue} />
        <div>
          <fieldset className="flex flex-col gap-4 border-0">
            <legend className="mb-2 ml-2">Select your booking dates</legend>
            <DateInput
              handleChange={handleCheckInValue}
              value={checkInDate}
              placeholder="check-in"
            />
            <DateInput
              handleChange={handleCheckOutValue}
              value={checkOutDate}
              placeholder="check-out"
            />
          </fieldset>
          {invalidDatesMessage && <p>{invalidDatesMessage}</p>}
          <div className="mt-4 flex gap-2">
            <Button
              type="button"
              style="dateReset"
              handleClick={handleResetBookingPeriod}
            >
              Reset
            </Button>
            <Button
              type="button"
              style="date"
              handleClick={handleSetBookingPeriod}
            >
              Check availability
            </Button>
          </div>
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
