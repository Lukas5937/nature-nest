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
    <form className="flex flex-col gap-6" onSubmit={handleSubmit} noValidate>
      <div className="flex flex-col">
        <label htmlFor="email">Email</label>
        <input
          className="bg-lightGreen"
          type="email"
          id="email"
          ref={emailRef}
        />
      </div>
      {formIsInvalid.email && <p>Please enter a valid email address.</p>}
      <div className="flex flex-col">
        <label htmlFor="password">Password</label>
        <input
          className="bg-lightGreen"
          type="password"
          id="password"
          ref={passwordRef}
        />
      </div>
      {formIsInvalid.password && (
        <p>Your password must be at least 6 characters long.</p>
      )}
      <div className="flex flex-col">
        <label htmlFor="passwordConfirmation">confirm Password</label>
        <input
          className="bg-lightGreen"
          type="password"
          id="passwordConfirmation"
          ref={passwordConfirmationRef}
        />
      </div>
      {formIsInvalid.passwordConfirmation && (
        <p>Please make sure the password confirmation matches the password.</p>
      )}
      {!formIsInvalid.password &&
        !formIsInvalid.passwordConfirmation &&
        serverError && <p>{serverError}</p>}
      <div className="mx-auto text-center">
        <p>Already have an account?</p>
        <Link className="mx-auto" to="?mode=login">
          Log in here to access your account.
        </Link>{" "}
      </div>

      <button>Sign up</button>
    </form>
  )
}
