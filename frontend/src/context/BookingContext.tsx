import { createContext, useState, useCallback, type ReactNode } from "react"

type BookingContextProviderProps = {
  children: ReactNode
}

type BookingContextValue = {
  today: string | null
  bookingPeriod: string[] | null
  totalPrice: number | null
  addBookingPeriod: (period: string[]) => void
  addTotalPrice: (price: number) => void
}

export const BookingContext = createContext<BookingContextValue>({
  today: null,
  bookingPeriod: null,
  totalPrice: null,
  addBookingPeriod: () => {},
  addTotalPrice: () => {},
})

export default function BookingContextProvider({
  children,
}: BookingContextProviderProps) {
  const [bookingPeriod, setBookingPeriod] = useState<string[] | null>(null)
  const [totalPrice, setTotalPrice] = useState<number | null>(null)

  const todayObject = new Date()
  const month = ("0" + (todayObject.getMonth() + 1)).slice(-2)
  const day = ("0" + todayObject.getDate()).slice(-2)
  const year = todayObject.getFullYear()
  const today = `${month}/${day}/${year}`

  const addBookingPeriod = useCallback((period: string[]) => {
    setBookingPeriod(period)
  }, [])

  function addTotalPrice(price: number) {
    setTotalPrice(price)
  }

  const value = {
    today,
    bookingPeriod,
    totalPrice,
    addBookingPeriod,
    addTotalPrice,
  }
  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  )
}
