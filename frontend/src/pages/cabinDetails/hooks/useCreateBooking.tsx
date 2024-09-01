import { useMutation } from "@tanstack/react-query"
import { createBooking } from "../../../util/http"

import { type CreateBookingProps, type FetchError } from "../../../util/http"

import { type LoginResponse } from "../../../context/LoginContext"

export default function useCreateBooking() {
  const { mutate, isPending, isError, error } = useMutation<
    LoginResponse,
    FetchError,
    CreateBookingProps
  >({
    mutationFn: createBooking,
    onSuccess: (newBooking) => {
      console.log(newBooking)
    },
  })

  return { mutate, isPending, isError, error }
}
