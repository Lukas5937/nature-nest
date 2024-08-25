import { createContext, useState, useCallback, type ReactNode } from "react"

type BookingContextProviderProps = {
  children: ReactNode
}

type BookingContextValue = {
  date: string | null
  bookingPeriod: string[] | null
  totalPrice: number | null
  addBookingPeriod: (period: string[]) => void
  addTotalPrice: (price: number) => void
  //   cabin: string | null
}

export const BookingContext = createContext<BookingContextValue>({
  date: null,
  bookingPeriod: null,
  totalPrice: null,
  addBookingPeriod: () => {},
  addTotalPrice: () => {},
  //   cabin: null,
})

export default function BookingContextProvider({
  children,
}: BookingContextProviderProps) {
  const [date, setDate] = useState<string | null>(null)
  const [bookingPeriod, setBookingPeriod] = useState<string[] | null>(null)
  const [totalPrice, setTotalPrice] = useState<number | null>(null)

  function addBookingDate() {
    const today = new Date()
    const month = ("0" + (today.getMonth() + 1)).slice(-2)
    const day = ("0" + today.getDate()).slice(-2)
    const year = today.getFullYear()
    const todayString = `${month}/${day}/${year}`
    setDate(todayString)
  }

  const addBookingPeriod = useCallback((period: string[]) => {
    setBookingPeriod(period)
  }, [])

  function addTotalPrice(price: number) {
    setTotalPrice(price)
  }

  const value = {
    date,
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
