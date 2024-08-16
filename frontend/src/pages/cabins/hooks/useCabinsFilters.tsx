import { useState, type ChangeEvent } from "react"
import { type Cabin } from "../../../http"

export default function useCabinsFilters() {
  const [searchTerm, setSearchTerm] = useState("")
  const [checkInDate, setCheckInDate] = useState("")
  const [checkOutDate, setCheckOutDate] = useState("")

  function createDatesArray(checkIn: string, checkOut: string) {
    const datesArray: Date[] = []
    for (
      let i = new Date(checkIn);
      i <= new Date(checkOut);
      i.setDate(i.getDate() + 1)
    ) {
      datesArray.push(new Date(i))
    }
    return datesArray
  }

  const occupiedDates = createDatesArray(checkInDate, checkOutDate)

  function handleSearchValue(event: ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.currentTarget.value)
  }

  function handleCheckInValue(event: ChangeEvent<HTMLInputElement>) {
    setCheckInDate(event.currentTarget.value)
  }

  function handleCheckOutValue(event: ChangeEvent<HTMLInputElement>) {
    setCheckOutDate(event.currentTarget.value)
  }

  function filterResults(data: Cabin[]) {
    return data.filter(
      (cabin) =>
        cabin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cabin.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cabin.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cabin.country.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }

  return {
    searchTerm,
    occupiedDates,
    handleSearchValue,
    handleCheckInValue,
    handleCheckOutValue,
    filterResults,
  }
}
