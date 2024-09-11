import { createContext, useState, useCallback, type ReactNode } from "react"
import type { BookingsResponseData } from "../util/http"

type BookingContextProviderProps = {
  children: ReactNode
}

type BookingContextValue = {
  today: string | null
  bookingPeriod: string[] | null
  totalPrice: number | null
  addBookingPeriod: (period: string[]) => void
  addTotalPrice: (price: number) => void
  newBooking: BookingsResponseData | null
  setNewBooking: React.Dispatch<
    React.SetStateAction<null | BookingsResponseData>
  >
}

export const BookingContext = createContext<BookingContextValue>({
  today: null,
  bookingPeriod: null,
  totalPrice: null,
  addBookingPeriod: () => {},
  addTotalPrice: () => {},
  newBooking: null,
  setNewBooking: () => {},
})

export default function BookingContextProvider({
  children,
}: BookingContextProviderProps) {
  const [newBooking, setNewBooking] = useState<BookingsResponseData | null>(
    null,
  )
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
    newBooking,
    setNewBooking,
  }
  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  )
}
