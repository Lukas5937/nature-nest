import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { LoginContext } from "../../../context/LoginContext"
import { loginUser } from "../../../util/http"

import { type LoginUser, type FetchError } from "../../../util/http"
import { type LoginResponse } from "../../../context/LoginContext"

export default function useLoginUser() {
  const loginContext = useContext(LoginContext)

  if (!loginContext) {
    throw new Error("LoginContext is not available.")
  }

  const { login } = loginContext

  const navigate = useNavigate()

  const { mutate, isPending, isError, error } = useMutation<
    LoginResponse,
    FetchError,
    LoginUser
  >({
    mutationFn: loginUser,
    onSuccess: (userData) => {
      login(userData)
      navigate("/")
    },
    onError: (error: FetchError) => {
      console.error(error.message)
    },
  })

  return { mutate, isPending, isError, error }
}
