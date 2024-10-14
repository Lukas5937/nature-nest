import { useState, useRef, useContext, type FormEvent } from "react"
import { Link } from "react-router-dom"
import { LoginContext } from "../../../context/LoginContext"

type LoginFormProps = {
  mutate: (formData: { email: string; password: string }) => void
}

export type ResponseError = Error & {
  code: number
}

export default function LoginForm({ mutate }: LoginFormProps) {
  const { serverError, changeServerError } = useContext(LoginContext)
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const [formIsInvalid, setFormIsInvalid] = useState({
    email: false,
    password: false,
  })

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormIsInvalid({
      email: false,
      password: false,
    })

    const email = emailRef.current!.value
    const password = passwordRef.current!.value
    const invalidEmail = !email.includes("@")
    const invalidPassword = password.length < 6

    if (invalidEmail || invalidPassword) {
      setFormIsInvalid({
        email: invalidEmail,
        password: invalidPassword,
      })
      return
    }
    mutate({ email, password })
    event.currentTarget.reset()
  }

  function handleSignUpLink() {
    changeServerError("")
  }

  return (
    <div className="mx-auto mt-10 max-w-md rounded-lg p-6">
      <h2 className="mb-4 text-center text-2xl font-semibold text-dark">
        Log In
      </h2>
      <p className="mb-6 text-center text-text">
        Please enter your email and password to log in to your account.
      </p>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm text-text">
            Email
          </label>
          <input
            className="rounded border border-gray-300 bg-grayCard px-3 py-2 text-dark focus:outline-none focus:ring-2 focus:ring-green"
            type="email"
            id="email"
            ref={emailRef}
          />
          {formIsInvalid.email && (
            <p className="mt-1 text-sm text-magenta">
              Please enter a valid email address.
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="text-sm text-text">
            Password
          </label>
          <input
            className="rounded border border-gray-300 bg-grayCard px-3 py-2 text-dark focus:outline-none focus:ring-2 focus:ring-green"
            type="password"
            id="password"
            ref={passwordRef}
          />
          {formIsInvalid.password && (
            <p className="mt-1 text-sm text-magenta">
              Password incorrect. Please try again.
            </p>
          )}
        </div>
        {!formIsInvalid.password && serverError && (
          <p className="text-sm text-magenta">{serverError}</p>
        )}
        <div className="text-center">
          <p className="text-sm text-text">Don't have an account yet?</p>
          <p className="text-sm text-text">Join us today!</p>
          <Link
            className="text-green underline hover:text-greenHover"
            to="?mode=signup"
            onClick={handleSignUpLink}
          >
            Sign up now to create your account.
          </Link>
        </div>

        <button className="w-full rounded bg-green py-2 text-light hover:bg-greenHover focus:outline-none focus:ring-2 focus:ring-green">
          Login
        </button>
      </form>
    </div>
  )
}
