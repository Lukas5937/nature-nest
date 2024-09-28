import { useEffect, useContext } from "react"
import { Outlet } from "react-router-dom"
import useCabinsFilters from "./hooks/useCabinsFilters"
import useCabinsFetch from "./hooks/useCabinsFetch"
import { BookingContext } from "../../context/BookingContext"

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

  const { addBookingPeriod } = useContext(BookingContext)

  useEffect(() => {
    addBookingPeriod(null)
  }, [addBookingPeriod])

  const outletContext = {
    data,
    isPending,
    isError,
    error,
    displayedCabins,
    invalidDatesMessage,
  }

  return (
    <main className="mx-auto grid w-11/12 max-w-screen-xl gap-4 lg:my-8 lg:grid-cols-[auto_1fr] lg:gap-8">
      <section className="grid grid-rows-[1fr_auto] items-start lg:sticky lg:top-8 lg:block lg:h-max lg:w-56">
        <div>
          <fieldset className="flex flex-col gap-4 border-0 lg:mt-4">
            <legend className="mb-2 text-lg font-semibold text-dark">
              Select your booking dates
            </legend>
            <div className="flex flex-col gap-2 xs:flex-row lg:flex-col lg:gap-4">
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
            </div>
          </fieldset>
          {invalidDatesMessage && (
            <div className="mt-2 text-sm text-magenta sm:text-base">
              {invalidDatesMessage}
            </div>
          )}
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
        <div className="mt-8 grid gap-4 lg:mt-0">
          <SortButtons
            activeSortMethod={activeSortMethod}
            setActiveSortMethod={setActiveSortMethod}
          />
          <SearchInput handleChange={handleSearchValue} />
        </div>
      </section>
      <Outlet context={outletContext} />
    </main>
  )
}
