import { useContext, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { LoginContext } from "../../context/LoginContext"
import {
  fetchBookings,
  type BookingsResponseData,
  type FetchError,
} from "../../util/http"
import useDeleteBooking from "./hooks/useDeleteBooking"

import Button from "../../UI/Button"
import CircularProgress from "@mui/material/CircularProgress"
import FetchErrorBox from "../../UI/FetchErrorBox"

import CabinImage from "../../assets/cabin/WhisperingPinesCabin.jpeg"

export default function Bookings() {
  const { user, token } = useContext(LoginContext)

  const [activeButton, setActiveButton] = useState("")

  const {
    data: bookings,
    isPending: bookingsIsPending,
    isError: bookingsIsError,
    error: bookingsError,
  } = useQuery<BookingsResponseData[], FetchError>({
    queryKey: ["bookings"],
    queryFn: ({ signal }) => {
      if (user && token) {
        return fetchBookings({ signal, token })
      }
      throw new Error("We couldn't find a user with the provided user id.")
    },
    enabled: user !== null && token !== null,
  })

  const {
    mutate,
    isPending: deleteIsPending,
    isError: deleteIsError,
    error: deleteError,
  } = useDeleteBooking()

  function handleDelete(bookingId: string) {
    if (token) {
      mutate({ bookingId, token })
      setActiveButton(bookingId)
    }
  }

  const bookingCards = bookings?.map((booking) => (
    <li key={booking._id}>
      <div className="bg-greenCard relative flex max-w-screen-lg flex-col items-stretch justify-between rounded-lg p-4 shadow-md md:flex-row md:gap-36">
        <div className="absolute right-4 top-4 mb-2 text-sm">
          <strong>Your booking from {booking.date}</strong>
        </div>

        <div className="xsl:flex-row mt-8 flex flex-col gap-4 md:mt-0 lg:gap-8">
          <img
            src={CabinImage}
            alt={`Image of ${booking.cabin.name}`}
            className="h-32 w-auto rounded-lg object-cover"
          />
          <div className="w-full">
            <h2 className="font-semibold text-darkGreen sm:text-lg">
              {booking.cabin.name}
            </h2>
            <p className="text-sm sm:mt-1">
              <strong className="text-magenta">Booking period:</strong>{" "}
              {booking.bookingPeriod[0]} -{" "}
              {booking.bookingPeriod[booking.bookingPeriod.length - 1]}
            </p>
            <p className="text-sm">
              <strong className="text-magenta">Length of Stay:</strong>{" "}
              {booking.bookingPeriod.length - 1}{" "}
              {booking.bookingPeriod.length - 1 > 1 ? "nights" : "night"}
            </p>
            <p className="text-sm">
              <strong className="text-magenta">Total price:</strong> $
              {booking.totalPrice}
            </p>
          </div>
        </div>

        <div className="xsl:mt-0 xsl:self-end mt-2 shrink-0 md:mt-6 md:self-start">
          <Button
            type="button"
            style="cancel"
            handleClick={() => handleDelete(booking._id)}
          >
            {deleteIsPending && activeButton === booking._id ? (
              <div className="relative flex items-center justify-center">
                <p className="text-transparent">Cancel booking</p>
                <CircularProgress className="circular-progress magenta" />
              </div>
            ) : (
              "Cancel booking"
            )}
          </Button>
        </div>
      </div>
    </li>
  ))

  return (
    <main className="mx-auto mt-8 w-11/12 max-w-screen-xl">
      {bookings && (
        <>
          <h1 className="text-2xl font-semibold text-darkGreen">
            Your Bookings
          </h1>
          <p>Here are the details of all your current and past bookings.</p>
          <ul className="mt-8 flex flex-col gap-4">
            {deleteIsError ? (
              <FetchErrorBox error={deleteError} />
            ) : (
              bookingCards
            )}
          </ul>
        </>
      )}
      {bookingsIsPending && <CircularProgress />}
      {bookingsIsError && <FetchErrorBox error={bookingsError} />}
    </main>
  )
}
