import { useSearchParams } from "react-router-dom"
import useSignUpUser from "./hooks/useSignUpUser"
import useLoginUser from "./hooks/useLoginUser"
import LoadingSpinner from "../../UI/LoadingSpinner"
import FetchErrorBox from "../../UI/FetchErrorBox"
import LoginForm from "./components/LoginForm"
import SignUpForm from "./components/SignupForm"

export default function Authentication() {
  const [searchParams] = useSearchParams()
  const isLogin = searchParams.get("mode") === "login"

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

  return (
    <main className="mx-auto my-8 w-11/12 max-w-screen-md">
      {loginIsPending ||
        (signUpIsPending && (
          <>
            <p>Loading...</p>
            <LoadingSpinner />
          </>
        ))}
      {loginIsError ||
        (signUpIsError && <FetchErrorBox error={loginError || signUpError} />)}
      {isLogin && <LoginForm mutate={loginMutate} />}
      {!isLogin && <SignUpForm mutate={signUpMutate} />}
    </main>
  )
}
