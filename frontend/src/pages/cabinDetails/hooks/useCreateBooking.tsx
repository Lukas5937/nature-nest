import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { createBooking } from "../../../util/http"
import { BookingContext } from "../../../context/BookingContext"

import { type CreateBookingProps, type FetchError } from "../../../util/http"

import { type BookingsResponseData } from "../../../util/http"

export default function useCreateBooking() {
  const navigate = useNavigate()

  const { setNewBooking } = useContext(BookingContext)

  const { mutate, isPending, isError, error } = useMutation<
    BookingsResponseData,
    FetchError,
    CreateBookingProps
  >({
    mutationFn: createBooking,
    onSuccess: (newBooking) => {
      setNewBooking(newBooking)
      navigate("/new-booking")
    },
  })

  return { mutate, isPending, isError, error }
}
