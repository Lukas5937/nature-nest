import { useRef, type FormEvent } from "react"
import { Link } from "react-router-dom"

type LoginFormProps = {
  mutate: (formData: { email: string; password: string }) => void
}

export default function LoginForm({ mutate }: LoginFormProps) {
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const email = emailRef.current!.value
    const password = passwordRef.current!.value

    event.currentTarget.reset()

    mutate({ email, password })
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

      <div className="mx-auto">
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
