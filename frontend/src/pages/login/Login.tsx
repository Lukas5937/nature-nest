import { useSearchParams } from "react-router-dom"

export default function Login() {
  const [searchParams, setSearchParams] = useSearchParams()
  const isLogin = searchParams.get("mode") === "login"
}
