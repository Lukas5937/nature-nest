import { useContext, useEffect } from "react"
import { useParams, NavLink, Outlet, useOutletContext } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"

import { ModalContext } from "../../context/ModalContext"
import { LoginContext } from "../../context/LoginContext"
import { BookingContext } from "../../context/BookingContext"
import { fetchCabin } from "../../util/http"
import { type Cabin, type FetchError } from "../../util/http"

import CabinImages from "./components/CabinImages"
import FetchErrorBox from "../../UI/FetchErrorBox"
import Button from "../../UI/Button"
import LoginFirstModal from "./components/LoginFirstModal"
import BookingConfirmationModal from "./components/BookingConfirmationModal"
import SelectBookingPeriodModal from "./components/SelectBookingPeriodModal"
import UnavailableBookingPeriodModal from "./components/UnavailableBookingPeriodModal"
import InvalidBookingPeriodModal from "./components/InvalidBookingPeriodModal"

export default function CabinDetails() {
  const { cabinId } = useParams()

  const { token } = useContext(LoginContext)
  const {
    showLoginFirst,
    showBookingConfirmation,
    showSelectBookingPeriod,
    showInvalidBookingPeriod,
    showUnavailableBookingPeriod,
  } = useContext(ModalContext)
  const { bookingPeriod } = useContext(BookingContext)

  const { data, isPending, isError, error } = useQuery<Cabin, FetchError>({
    queryKey: ["cabins", cabinId],
    queryFn: ({ signal }) => fetchCabin({ signal, cabinId }),
  })

  const { invalidDatesMessage } = useOutletContext<{
    invalidDatesMessage: string
  }>()

  function handleBookNow() {
    if (!bookingPeriod) {
      showSelectBookingPeriod()
      return
    }
    if (invalidDatesMessage) {
      showInvalidBookingPeriod()
      return
    }
    if (!token) {
      showLoginFirst()
      return
    }
    if (
      bookingPeriod &&
      data?.occupancy.some((date) => bookingPeriod.includes(date))
    ) {
      showUnavailableBookingPeriod()
      return
    }
    showBookingConfirmation()
  }

  useEffect(() => {
    if (
      bookingPeriod &&
      data?.occupancy.some((date) => bookingPeriod.includes(date))
    ) {
      showUnavailableBookingPeriod()
    }
  }, [bookingPeriod, data?.occupancy, showUnavailableBookingPeriod])

  if (data) {
    const { name, address, price } = data

    return (
      <main className="rounded-lg bg-grayCard p-4 lg:p-8">
        {data && (
          <div className="mx-auto max-w-6xl">
            <Button to=".." type="link" style="back">
              Back
            </Button>
            <div className="mt-6 grid grid-rows-[auto_1fr] gap-6 md:grid-cols-2 xl:grid-cols-[60%_1fr] xl:gap-12">
              <div className="col-span-1 row-start-2 mt-4 md:row-span-full md:mt-0">
                <CabinImages cabin={data} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-darkGreen">{name}</h1>
                <p className="text-dark">{address}</p>
              </div>
              <div className="mt-8 flex flex-col justify-between">
                <div className="flex items-center justify-end gap-4">
                  <div className="text-right">
                    <p className="text-2xl font-semibold text-magenta">
                      ${price}
                    </p>
                    <p className="mt-[-2px] text-right font-light text-dark">
                      /day
                    </p>
                  </div>
                  <Button
                    handleClick={handleBookNow}
                    type="button"
                    style="booking"
                  >
                    Book now
                  </Button>
                </div>
                <div className="mt-6">
                  <nav className="mb-6 flex gap-8 pb-2">
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? "border-b-2 border-darkGreen text-dark"
                          : "text-dark"
                      }
                      end
                      preventScrollReset
                      to=""
                    >
                      Details
                    </NavLink>
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? "border-b-2 border-darkGreen text-dark"
                          : "text-dark"
                      }
                      preventScrollReset
                      to="map"
                    >
                      Map
                    </NavLink>
                  </nav>
                  <div className="h-72 overflow-auto">
                    <Outlet context={data} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <LoginFirstModal />
        <SelectBookingPeriodModal />
        <UnavailableBookingPeriodModal />
        <InvalidBookingPeriodModal />
        <BookingConfirmationModal cabin={data} price={price} />
        {isError && <FetchErrorBox error={error} />}
        {isPending && (
          <>
            <p>Loading...</p>
          </>
        )}
      </main>
    )
  }
}
