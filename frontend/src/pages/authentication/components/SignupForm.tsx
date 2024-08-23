import { useRef, type FormEvent } from "react"
import { Link } from "react-router-dom"

type SignUpFormProps = {
  mutate: (formData: {
    email: string
    password: string
    passwordConfirmation: string
  }) => void
}

export default function SignUpForm({ mutate }: SignUpFormProps) {
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const passwordConfirmationRef = useRef<HTMLInputElement>(null)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const email = emailRef.current!.value
    const password = passwordRef.current!.value
    const passwordConfirmation = passwordConfirmationRef.current?.value || ""
    event.currentTarget.reset()

    mutate({ email, password, passwordConfirmation })
  }

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      <div className="flex flex-col">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" ref={emailRef} />
      </div>
      <div className="flex flex-col">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" ref={passwordRef} />
      </div>

      <div className="flex flex-col">
        <label htmlFor="passwordConfirmation">confirm Password</label>
        <input
          type="password"
          id="passwordConfirmation"
          ref={passwordConfirmationRef}
        />
      </div>
      <div className="mx-auto">
        <p>Already have an account?</p>
        <Link className="mx-auto" to="?mode=login">
          Log in here to access your account.
        </Link>{" "}
      </div>

      <button>Sign up</button>
    </form>
  )
}
