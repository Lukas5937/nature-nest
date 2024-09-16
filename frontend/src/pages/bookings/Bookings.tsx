import { useState, useContext } from "react"
import { useQuery } from "@tanstack/react-query"
import { LoginContext } from "../../context/LoginContext"
import { ModalContext } from "../../context/ModalContext"
import { BookingContext } from "../../context/BookingContext"
import {
  fetchBookings,
  type BookingsResponseData,
  type FetchError,
} from "../../util/http"
import useImageURLs from "../../hooks/useImageUrls"

import CancellationConfirmationModal from "./components/CancellationConfirmationModal"
import Button from "../../UI/Button"
import CircularProgress from "@mui/material/CircularProgress"
import FetchErrorBox from "../../UI/FetchErrorBox"

export default function Bookings() {
  const { user, token } = useContext(LoginContext)
  const { showCancellationConfirmation } = useContext(ModalContext)
  const { today } = useContext(BookingContext)

  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(
    null,
  )

  const {
    data: bookings,
    isPending,
    isError,
    error,
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

  const { createCoverImageUrl } = useImageURLs()

  function handleCancelBooking(bookingId: string) {
    setSelectedBookingId(bookingId)
    showCancellationConfirmation()
  }

  const currentBookings =
    (today &&
      bookings?.filter(
        (booking) => new Date(booking.bookingPeriod[0]) >= new Date(today),
      )) ||
    []

  const pastBookings =
    (today &&
      bookings?.filter(
        (booking) => new Date(booking.bookingPeriod[0]) < new Date(today),
      )) ||
    []

  function sortBookings(bookings: BookingsResponseData[]) {
    return bookings.sort((a, b) => {
      const bookingPeriodA = new Date(a.bookingPeriod[0])
      const bookingPeriodB = new Date(b.bookingPeriod[0])
      const dateA = new Date(a.date)
      const dateB = new Date(b.date)

      if (bookingPeriodA > bookingPeriodB) return 1
      if (bookingPeriodA < bookingPeriodB) return -1
      if (dateA > dateB) return 1
      if (dateA < dateB) return -1
      return 0
    })
  }

  const sortedCurrentBookings = sortBookings(currentBookings)
  const sortedPastBookings = sortBookings(pastBookings)

  function createBookingCards(
    bookings: BookingsResponseData[],
    style: "current" | "past",
  ) {
    return bookings.map((booking) => {
      const coverImageUrl = createCoverImageUrl(booking.cabin)
      return (
        <li key={booking._id}>
          <div
            className={
              style === "current"
                ? "flex max-w-screen-lg flex-col items-stretch justify-between rounded-lg bg-greenCard p-4 shadow-md sm:flex-row sm:gap-12"
                : "flex max-w-screen-lg flex-col items-stretch justify-between rounded-lg bg-grayCard p-4 shadow-md sm:flex-row sm:gap-12"
            }
          >
            <div className="flex flex-col gap-4 sm:flex-row">
              <img
                src={coverImageUrl}
                alt={`Image of ${booking.cabin.name}`}
                className="h-32 w-auto rounded-lg object-cover"
              />
              <div className="w-full">
                <h2 className="font-semibold text-darkGreen md:text-lg">
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
            <div className="mt-6 xs:mt-2 xs:text-end sm:mt-0">
              <div className="mb-2 text-sm">
                <strong>Your booking from {booking.date}</strong>
              </div>
              {style === "current" && (
                <Button
                  type="button"
                  style="cancel"
                  handleClick={() => handleCancelBooking(booking._id)}
                >
                  Cancel booking
                </Button>
              )}
            </div>
          </div>
        </li>
      )
    })
  }

  const currentBookingsCards = createBookingCards(
    sortedCurrentBookings,
    "current",
  )
  const pastBookingsCards = createBookingCards(sortedPastBookings, "past")

  return (
    <main className="mx-auto mt-4 w-11/12 max-w-screen-xl">
      {bookings && (
        <>
          <h1 className="text-lg">
            Here are the details of all your current and past bookings.
          </h1>
          <h2 className="mt-8 text-2xl font-semibold text-darkGreen">
            Current bookings
          </h2>
          <ul className="mt-2 flex flex-col gap-4">{currentBookingsCards}</ul>
          <h2 className="mt-8 text-2xl font-semibold">Past bookings</h2>
          <ul className="mt-2 flex flex-col gap-4">{pastBookingsCards}</ul>
        </>
      )}
      {isPending && <CircularProgress />}
      {isError && <FetchErrorBox error={error} />}
      {selectedBookingId && (
        <CancellationConfirmationModal bookingId={selectedBookingId} />
      )}
    </main>
  )
}
