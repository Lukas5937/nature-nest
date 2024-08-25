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
  const { serverError } = useContext(LoginContext)
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
      {!formIsInvalid.password && serverError && <p>{serverError}</p>}

      <div className="mx-auto text-center">
        <p>Don't have an account yet?</p>
        <p>Join us today!</p>
        <Link className="mx-auto" to="?mode=signup">
          Sign up now to create your account.
        </Link>{" "}
      </div>
      <button>Login</button>
    </form>
  )
}
