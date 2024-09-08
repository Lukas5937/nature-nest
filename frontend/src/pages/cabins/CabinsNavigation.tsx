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
    <main className="mx-auto grid w-11/12 max-w-screen-xl gap-2 lg:my-8 lg:grid-cols-[1fr_auto] lg:gap-12">
      <section className="grid grid-rows-[1fr_auto] items-start lg:sticky lg:top-8 lg:block lg:h-max">
        <div>
          <fieldset className="flex flex-col items-start gap-4 border-0 lg:mt-4">
            <legend className="mb-2 ml-2">Select your booking dates</legend>
            <div className="xs:flex-row flex flex-col gap-2 lg:flex-col lg:gap-4">
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
            <div className="ml-2 mt-2 text-sm text-magenta sm:text-base">
              {invalidDatesMessage}
            </div>
          )}
          <div className="mt-2 flex gap-2 lg:mt-4">
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
        <div className="mt-8 grid items-end justify-between md:flex md:flex-row lg:mt-0 lg:flex-col lg:items-stretch lg:gap-0">
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
