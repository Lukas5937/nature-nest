import { useEffect, useState, useContext, type ChangeEvent } from "react"
import { type Cabin } from "../../../util/http"
import useCabinsFetch from "./useCabinsFetch"
import { BookingContext } from "../../../context/BookingContext"

export type SortMethods = "name" | "priceLow" | "priceHigh" | "popularity"

export default function useCabinsFilters() {
  const { data: cabins } = useCabinsFetch()

  const [checkInDate, setCheckInDate] = useState("")
  const [checkOutDate, setCheckOutDate] = useState("")

  const [searchTerm, setSearchTerm] = useState("")
  const [displayedCabins, setDisplayedCabins] = useState<Cabin[]>(cabins || [])
  const [activeSortMethod, setActiveSortMethod] = useState<SortMethods>("name")
  const [invalidDatesMessage, setInvalidDatesMessage] = useState("")

  const { today, bookingPeriod, addBookingPeriod } = useContext(BookingContext)

  function formatDate(dateString: string | Date) {
    const date = new Date(dateString)
    const month = ("0" + (date.getMonth() + 1)).slice(-2)
    const day = ("0" + date.getDate()).slice(-2)
    const year = date.getFullYear()
    return `${month}/${day}/${year}`
  }

  function handleCheckInValue(event: ChangeEvent<HTMLInputElement>) {
    setCheckInDate(event.currentTarget.value)
  }

  function handleCheckOutValue(event: ChangeEvent<HTMLInputElement>) {
    setCheckOutDate(event.currentTarget.value)
  }

  function createDatesArray(checkIn: string, checkOut: string) {
    const datesArray: string[] = []
    for (
      let i = new Date(checkIn);
      i <= new Date(checkOut);
      i.setDate(i.getDate() + 1)
    ) {
      const dateString = formatDate(i)
      datesArray.push(dateString)
    }
    return datesArray
  }

  function validateDates() {
    const formattedCheckIn = formatDate(checkInDate)
    const formattedCheckOut = formatDate(checkOutDate)
    if (today) {
      if (!checkInDate) {
        return setInvalidDatesMessage("Please select a check in date.")
      }
      if (new Date(formattedCheckIn) < new Date(today)) {
        return setInvalidDatesMessage(
          "The selected check-in date cannot be in the past. Please choose a valid date.",
        )
      }
      if (!checkOutDate) {
        return setInvalidDatesMessage("Please select a check out date.")
      }
      if (new Date(formattedCheckOut) < new Date(today)) {
        return setInvalidDatesMessage(
          "The selected check-out date cannot be in the past. Please choose a valid date.",
        )
      }
      if (new Date(formattedCheckOut) <= new Date(formattedCheckIn)) {
        return setInvalidDatesMessage(
          "The checkout date must be after the check-in date. Please choose a valid date.",
        )
      }
      return setInvalidDatesMessage("")
    }
  }

  function handleSetBookingPeriod() {
    validateDates()
    const dateRange = createDatesArray(checkInDate, checkOutDate)
    return addBookingPeriod(dateRange)
  }

  function handleResetBookingPeriod() {
    setCheckInDate("")
    setCheckOutDate("")
    addBookingPeriod([])
  }

  function handleSearchValue(event: ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.currentTarget.value)
  }

  useEffect(() => {
    if (cabins) {
      let sortedCabins = [...cabins]
      if (activeSortMethod === "name") {
        sortedCabins = cabins.sort((a: Cabin, b: Cabin) =>
          a.name.localeCompare(b.name),
        )
      }
      if (activeSortMethod === "priceLow") {
        sortedCabins = cabins.sort((a: Cabin, b: Cabin) => a.price - b.price)
      }
      if (activeSortMethod === "priceHigh") {
        sortedCabins = cabins.sort((a: Cabin, b: Cabin) => b.price - a.price)
      }
      if (activeSortMethod === "popularity") {
        sortedCabins = cabins.sort(
          (a: Cabin, b: Cabin) => b.occupancy.length - a.occupancy.length,
        )
      }

      let vacantCabins = sortedCabins
      if (bookingPeriod) {
        vacantCabins = sortedCabins.filter(
          (cabin) =>
            !cabin.occupancy.some((date) => bookingPeriod.includes(date)),
        )
      }

      const filteredCabins = vacantCabins.filter(
        (cabin) =>
          cabin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          cabin.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          cabin.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
          cabin.country.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setDisplayedCabins(filteredCabins)
    }
  }, [
    cabins,
    activeSortMethod,
    checkInDate,
    checkOutDate,
    searchTerm,
    bookingPeriod,
  ])

  return {
    displayedCabins,
    activeSortMethod,
    checkInDate,
    checkOutDate,
    invalidDatesMessage,
    setActiveSortMethod,
    handleSearchValue,
    handleCheckInValue,
    handleCheckOutValue,
    handleSetBookingPeriod,
    handleResetBookingPeriod,
  }
}
