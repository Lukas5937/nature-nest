import { useContext } from "react"
import { LoginContext } from "../../context/LoginContext"

export default function Bookings() {
  const { user } = useContext(LoginContext)
  console.log(user)

  return <h1>These are your bookings</h1>
}
