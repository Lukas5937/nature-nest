import { useContext, useEffect } from "react"
import { useParams, NavLink, Outlet } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"

import { ModalContext } from "../../context/ModalContext"
import { LoginContext } from "../../context/LoginContext"
import { BookingContext } from "../../context/BookingContext"
import { fetchCabin } from "../../util/http"
import { type Cabin, type FetchError } from "../../util/http"

import CabinImages from "./components/CabinImages"
import FetchErrorBox from "../../UI/FetchErrorBox"
import CircularProgress from "@mui/material/CircularProgress"
import Button from "../../UI/Button"
import LoginFirstModal from "./components/LoginFirstModal"
import BookingConfirmationModal from "./components/BookingConfirmationModal"
import SelectBookingPeriodModal from "./components/SelectBookingPeriodModal"
import UnavailableBookingPeriodModal from "./components/UnavailableBookingPeriodModal"

export default function CabinDetails() {
  const { cabinId } = useParams()

  const { token } = useContext(LoginContext)
  const {
    showLoginFirst,
    showBookingConfirmation,
    showSelectBookingPeriod,
    showUnavailableBookingPeriod,
  } = useContext(ModalContext)
  const { bookingPeriod } = useContext(BookingContext)

  const { data, isPending, isError, error } = useQuery<Cabin, FetchError>({
    queryKey: ["cabins", cabinId],
    queryFn: ({ signal }) => fetchCabin({ signal, cabinId }),
  })

  function handleBookNow() {
    if (!bookingPeriod || bookingPeriod.length === 0) {
      showSelectBookingPeriod()
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
      console.log("hello")
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
      <main>
        {data && (
          <div className="mt-8 lg:mt-0">
            <Button to=".." type="link" style="back">
              Back
            </Button>
            <div className="mt-4 grid grid-rows-[auto_1fr] gap-x-6 md:grid-cols-2 xl:grid-cols-[60%_1fr] xl:gap-x-12">
              <div className="col-span-1 row-start-2 mt-4 md:row-span-full md:mt-0">
                <CabinImages />
              </div>
              <div className="">
                <h1 className="text-lg font-bold">{name}</h1>
                <p>{address}</p>
              </div>
              <div className="mt-8 flex flex-col justify-end">
                <div className="flex items-center justify-end gap-4">
                  <div>
                    <p className="text-xl font-semibold">${price}</p>
                    <p className="mt-[-4px] text-right font-light">/day</p>
                  </div>
                  <Button
                    handleClick={handleBookNow}
                    type="button"
                    style="booking"
                  >
                    Book now
                  </Button>
                </div>
                <div className="mt-4">
                  <nav className="mb-4 flex gap-8">
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "border-b-2 border-stone-300" : ""
                      }
                      end
                      preventScrollReset
                      to=""
                    >
                      Details
                    </NavLink>
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "border-b-2 border-stone-300" : ""
                      }
                      preventScrollReset
                      to="map"
                    >
                      Map
                    </NavLink>
                  </nav>
                  <div className="h-72">
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
        <BookingConfirmationModal cabin={data} price={price} />
        {isError && <FetchErrorBox error={error} />}
        {isPending && (
          <>
            <p>Loading...</p>
            <CircularProgress />
          </>
        )}
      </main>
    )
  }
}
