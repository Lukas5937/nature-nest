import { useContext } from "react"
import { useQuery } from "@tanstack/react-query"
import { LoginContext } from "../../context/LoginContext"
import {
  fetchBookings,
  type BookingsResponseData,
  type FetchError,
} from "../../util/http"

export default function Bookings() {
  const { user, token } = useContext(LoginContext)
  console.log(user)

  const {
    data: bookings,
    isPending,
    isError,
    error,
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

  const bookingCards = bookings?.map((booking) => (
    <div className="mt-4 bg-lightGreen p-4">
      <h2>{booking.cabin.name}</h2>
      <p>{booking.date}</p>
      <p>{booking.totalPrice}</p>
      <p>
        {booking.bookingPeriod[0]} -{" "}
        {booking.bookingPeriod[booking.bookingPeriod.length - 1]}
      </p>
    </div>
  ))

  console.log(isPending)
  console.log(isError)
  console.log(error)

  return (
    <>
      <h1>These are your bookings</h1>
      {bookingCards}
    </>
  )
}
