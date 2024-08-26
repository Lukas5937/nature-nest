import { createContext, useState, useCallback, type ReactNode } from "react"

type BookingContextProviderProps = {
  children: ReactNode
}

type BookingContextValue = {
  bookingDate: string | null
  bookingPeriod: string[] | null
  totalPrice: number | null
  addBookingPeriod: (period: string[]) => void
  addTotalPrice: (price: number) => void
  addBookingDate: () => void
}

export const BookingContext = createContext<BookingContextValue>({
  bookingDate: null,
  bookingPeriod: null,
  totalPrice: null,
  addBookingPeriod: () => {},
  addTotalPrice: () => {},
  addBookingDate: () => {},
})

export default function BookingContextProvider({
  children,
}: BookingContextProviderProps) {
  const [bookingDate, setBookingDate] = useState<string | null>(null)
  const [bookingPeriod, setBookingPeriod] = useState<string[] | null>(null)
  const [totalPrice, setTotalPrice] = useState<number | null>(null)

  function addBookingDate() {
    const today = new Date()
    const month = ("0" + (today.getMonth() + 1)).slice(-2)
    const day = ("0" + today.getDate()).slice(-2)
    const year = today.getFullYear()
    const todayString = `${month}/${day}/${year}`
    setBookingDate(todayString)
  }

  const addBookingPeriod = useCallback((period: string[]) => {
    setBookingPeriod(period)
  }, [])

  function addTotalPrice(price: number) {
    setTotalPrice(price)
  }

  const value = {
    bookingDate,
    bookingPeriod,
    totalPrice,
    addBookingDate,
    addBookingPeriod,
    addTotalPrice,
  }
  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  )
}
