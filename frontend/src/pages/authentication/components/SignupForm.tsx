import { useState, useRef, useContext, type FormEvent } from "react"
import { Link } from "react-router-dom"
import { LoginContext } from "../../../context/LoginContext"

type SignUpFormProps = {
  mutate: (formData: {
    email: string
    password: string
    passwordConfirmation: string
  }) => void
}

export default function SignUpForm({ mutate }: SignUpFormProps) {
  const { serverError } = useContext(LoginContext)

  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const passwordConfirmationRef = useRef<HTMLInputElement>(null)

  const [formIsInvalid, setFormIsInvalid] = useState({
    email: false,
    password: false,
    passwordConfirmation: false,
  })

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormIsInvalid({
      email: false,
      password: false,
      passwordConfirmation: false,
    })

    const email = emailRef.current!.value
    const password = passwordRef.current!.value
    const passwordConfirmation = passwordConfirmationRef.current?.value
    const invalidEmail = !email.includes("@")
    const invalidPassword = password.length < 6
    const invalidPasswordConfirmation = password !== passwordConfirmation

    if (invalidPassword || invalidPassword || invalidPasswordConfirmation) {
      setFormIsInvalid({
        email: invalidEmail,
        password: invalidPassword,
        passwordConfirmation: invalidPasswordConfirmation,
      })
      return
    }
    mutate({ email, password, passwordConfirmation })
    event.currentTarget.reset()
  }

  return (
    <div className="mx-auto mt-10 max-w-md rounded-lg p-6">
      <h2 className="mb-4 text-center text-2xl font-semibold text-dark">
        Create an Account
      </h2>
      <p className="mb-6 text-center text-text">
        Please fill out the form below to create a new account. Ensure that your
        password is at least 6 characters long.
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
              Your password must be at least 6 characters long.
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="passwordConfirmation" className="text-sm text-text">
            Confirm Password
          </label>
          <input
            className="rounded border border-gray-300 bg-grayCard px-3 py-2 text-dark focus:outline-none focus:ring-2 focus:ring-green"
            type="password"
            id="passwordConfirmation"
            ref={passwordConfirmationRef}
          />
          {formIsInvalid.passwordConfirmation && (
            <p className="mt-1 text-sm text-magenta">
              Please make sure the password confirmation matches the password.
            </p>
          )}
        </div>

        {!formIsInvalid.password &&
          !formIsInvalid.passwordConfirmation &&
          serverError && <p className="text-sm text-magenta">{serverError}</p>}

        <div className="text-center">
          <p className="text-sm text-text">Already have an account?</p>
          <Link
            className="text-green underline hover:text-greenHover"
            to="?mode=login"
          >
            Log in here to access your account.
          </Link>
        </div>

        <button className="w-full rounded bg-green py-2 text-light hover:bg-greenHover focus:outline-none focus:ring-2 focus:ring-green">
          Sign up
        </button>
      </form>
    </div>
  )
}
