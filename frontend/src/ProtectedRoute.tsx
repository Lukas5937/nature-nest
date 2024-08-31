import { ReactNode, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { LoginContext } from "./context/LoginContext"

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  const { token } = useContext(LoginContext)

  useEffect(() => {
    if (!token) {
      navigate("/auth?mode=login", { replace: true })
    }
  }, [token, navigate])

  return token ? <>{children}</> : null
}
