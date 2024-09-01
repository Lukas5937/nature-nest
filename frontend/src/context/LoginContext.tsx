import {
  createContext,
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from "react"

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

type LocalStorageData = {
  userData: LoginResponse
  expiration: string | null
}

type LoginContextValue = {
  token: string | null
  user: User | null
  login: (userData: LoginResponse, expirationDate?: Date) => void
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
  const [tokenExpirationDate, setTokenExpirationDate] = useState<Date | null>(
    null,
  )
  const [serverError, setServerError] = useState("")

  function login(userData: LoginResponse, expirationDate?: Date) {
    setToken(userData.token)
    setUser({
      id: userData.id,
      email: userData.email,
      bookings: userData.bookings,
    })
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60)
    setTokenExpirationDate(tokenExpirationDate)
    setServerError("")
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userData,
        expiration: tokenExpirationDate.toISOString(),
      }),
    )
  }

  const logout = useCallback(() => {
    setToken("")
    setUser(null)
    setTokenExpirationDate(null)
    localStorage.removeItem("userData")
  }, [])

  useEffect(() => {
    const storedData = localStorage.getItem("userData")
    if (storedData) {
      const parsedData: LocalStorageData = JSON.parse(storedData)
      if (parsedData.expiration && new Date(parsedData.expiration) > new Date())
        login(parsedData.userData, new Date(parsedData.expiration))
    }
  }, [])

  useEffect(() => {
    let logoutTimer: ReturnType<typeof setTimeout> | undefined
    if (token && tokenExpirationDate) {
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime()
      logoutTimer = setTimeout(logout, remainingTime)
    }
    return () => {
      if (logoutTimer) {
        clearTimeout(logoutTimer)
      }
    }
  }, [token, logout, tokenExpirationDate])

  function changeServerError(message: string) {
    setServerError(message)
  }

  const value = { token, user, login, logout, serverError, changeServerError }
  return <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
}
