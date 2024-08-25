import { createContext, useEffect, useState, type ReactNode } from "react"

type LoginContextProviderProps = {
  children: ReactNode
}

type User = {
  id: string
  email: string
  bookings: []
}

export type LoginResponse = User & {
  token: string | null
}

type LoginContextValue = {
  token: string | null
  user: User | null
  login: (userData: LoginResponse) => void
  logout: () => void
  serverError: string
  changeServerError: (message: string) => void
}

export const LoginContext = createContext<LoginContextValue>({
  token: null,
  user: null,
  login: () => {},
  logout: () => {},
  serverError: "",
  changeServerError: () => {},
})

export default function LoginContextProvider({
  children,
}: LoginContextProviderProps) {
  const [token, setToken] = useState<string | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [serverError, setServerError] = useState("")

  function login(userData: LoginResponse) {
    setToken(userData.token)
    setUser({
      id: userData.id,
      email: userData.email,
      bookings: userData.bookings,
    })
    setServerError("")
    localStorage.setItem("userData", JSON.stringify(userData))
  }

  function logout() {
    setToken("")
    setUser(null)
    localStorage.removeItem("userData")
  }

  useEffect(() => {
    const storedData = localStorage.getItem("userData")
    if (storedData) {
      const parsedData: LoginResponse = JSON.parse(storedData)
      login(parsedData)
    }
  }, [])

  function changeServerError(message: string) {
    setServerError(message)
  }

  const value = { token, user, login, logout, serverError, changeServerError }
  return <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
}
