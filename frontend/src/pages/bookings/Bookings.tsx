import { useContext } from "react"
import { useQuery } from "@tanstack/react-query"
import { LoginContext } from "../../context/LoginContext"
import {
  fetchBookings,
  type BookingsResponseData,
  type FetchError,
} from "../../util/http"
import useDeleteBooking from "./hooks/useDeleteBooking"

import Button from "../../UI/Button"

export default function Bookings() {
  const { user, token } = useContext(LoginContext)

  const {
    data: bookings,
    isPending: bookingsIsPending,
    isError: bookingsIsError,
    error: bookingsError,
  } = useQuery<BookingsResponseData[], FetchError>({
    queryKey: ["bookings"],
    queryFn: ({ signal }) => {
      if (user && token) {
        return fetchBookings({ signal, userId: user.id, token })
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
    }
  }

  const bookingCards = bookings?.map((booking) => (
    <li key={booking._id}>
      <div className="mt-4 bg-lightGreen p-4">
        <h2>{booking.cabin.name}</h2>
        <p>{booking.date}</p>
        <p>{booking.totalPrice}</p>
        <p>
          {booking.bookingPeriod[0]} -{" "}
          {booking.bookingPeriod[booking.bookingPeriod.length - 1]}
        </p>
        <Button
          style="magenta"
          type="button"
          handleClick={() => handleDelete(booking._id)}
        >
          Delete
        </Button>
      </div>
    </li>
  ))

  console.log(bookingsIsPending, deleteIsPending)
  console.log(bookingsIsError, deleteIsError)
  console.log(bookingsError, deleteError)

  return (
    <>
      <h1>These are your bookings</h1>
      {bookings && <ul>{bookingCards}</ul>}
    </>
  )
}
