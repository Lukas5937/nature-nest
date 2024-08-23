import { useRef, type FormEvent } from "react"
import { Link, useSearchParams } from "react-router-dom"
import useSignUpUser from "./hooks/useSignUpUser"
import useLoginUser from "./hooks/useLoginUser"
import { CircularProgress } from "@mui/material"
import FetchErrorBox from "../../UI/FetchErrorBox"

export default function Authentication() {
  const [searchParams] = useSearchParams()
  const isLogin = searchParams.get("mode") === "login"

  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const passwordConfirmationRef = useRef<HTMLInputElement>(null)

  const {
    mutate: loginMutate,
    isPending: loginIsPending,
    isError: loginIsError,
    error: loginError,
  } = useLoginUser()

  const {
    mutate: signUpMutate,
    isPending: signUpIsPending,
    isError: signUpIsError,
    error: signUpError,
  } = useSignUpUser()

  if (loginIsPending || signUpIsPending) {
    return (
      <>
        <p>Loading...</p>
        <CircularProgress />
      </>
    )
  }

  if (loginIsError || signUpIsError) {
    return <FetchErrorBox error={loginError || signUpError} />
  }

  function handleSubmit(
    event: FormEvent<HTMLFormElement>,
    type: "login" | "signUp",
  ) {
    event.preventDefault()
    const email = emailRef.current!.value
    const password = passwordRef.current!.value
    const passwordConfirmation = passwordConfirmationRef.current?.value || ""
    event.currentTarget.reset()
    if (type === "login") {
      loginMutate({ email, password })
    }
    if (type === "signUp") {
      console.log(passwordConfirmation)
      signUpMutate({ email, password, passwordConfirmation })
    }
  }

  return (
    <main className="mx-auto my-8 w-11/12 max-w-screen-md">
      <form
        className="flex flex-col gap-6"
        onSubmit={(event) => handleSubmit(event, isLogin ? "login" : "signUp")}
      >
        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" ref={emailRef} />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" ref={passwordRef} />
        </div>
        {!isLogin && (
          <div className="flex flex-col">
            <label htmlFor="passwordConfirmation">confirm Password</label>
            <input
              type="password"
              id="passwordConfirmation"
              ref={passwordConfirmationRef}
            />
          </div>
        )}
        {isLogin && (
          <div className="mx-auto">
            <p>Don't have an account yet?</p>
            <p>Join us today!</p>
            <Link
              className="mx-auto"
              to={`?mode=${isLogin ? "signup" : "login"}`}
            >
              Sign up now to create your account.
            </Link>{" "}
          </div>
        )}
        {!isLogin && (
          <div className="mx-auto">
            <p>Already have an account?</p>
            <Link
              className="mx-auto"
              to={`?mode=${isLogin ? "signup" : "login"}`}
            >
              Log in here to access your account.
            </Link>{" "}
          </div>
        )}
        <button>{isLogin ? "Login" : "Sign up"}</button>
      </form>
    </main>
  )
}
