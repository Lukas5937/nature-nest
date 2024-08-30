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
          <div className="mx-auto flex w-11/12 max-w-screen-xl gap-8">
            <div className="flex w-1/2 flex-col items-start">
              <Button to=".." type="link" style="back">
                Back
              </Button>
              <CabinImages />
            </div>
            <div className="flex w-1/2 flex-col gap-8">
              <div className="flex">
                <div className="flex gap-4">
                  <h1>{name}</h1>
                  <p>{price}</p>
                  <Button handleClick={handleBookNow} type="button">
                    Book now
                  </Button>
                </div>
              </div>
              <p>{address}</p>
              <nav className="flex gap-8">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "border-b-2 border-stone-300" : ""
                  }
                  end
                  to=""
                >
                  Details
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "border-b-2 border-stone-300" : ""
                  }
                  to="map"
                >
                  Maps
                </NavLink>
              </nav>
              <Outlet context={data} />
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
