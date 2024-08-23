import { useContext, useEffect } from "react"
import { LoginContext } from "../../context/LoginContext"
import { useNavigate } from "react-router-dom"

export default function Logout() {
  const { logout } = useContext(LoginContext)
  const navigate = useNavigate()

  useEffect(() => {
    logout()
    navigate("/")
  }, [logout, navigate])

  return null
}
