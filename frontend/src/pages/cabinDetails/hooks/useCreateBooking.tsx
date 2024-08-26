// import { useContext } from "react"
// import { useNavigate } from "react-router-dom"
// import { LoginContext } from "../../../context/LoginContext"
import { useMutation } from "@tanstack/react-query"
import { createBooking } from "../../../util/http"

import { type CreateBookingProps, type FetchError } from "../../../util/http"

import { type LoginResponse } from "../../../context/LoginContext"

export default function useCreateBooking() {
  //   const navigate = useNavigate()

  const { mutate, isPending, isError, error } = useMutation<
    LoginResponse,
    FetchError,
    CreateBookingProps
  >({
    mutationFn: createBooking,
    onSuccess: (newBooking) => {
      console.log(newBooking)
    },
    // onError: (error: FetchError) => {
    //   changeServerError(error.message)
    // },
  })

  return { mutate, isPending, isError, error }
}
