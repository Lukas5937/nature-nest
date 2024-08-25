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

  const { addBookingPeriod } = useContext(BookingContext)

  function createDatesArray(checkIn: string, checkOut: string) {
    const datesArray: string[] = []
    for (
      let i = new Date(checkIn);
      i <= new Date(checkOut);
      i.setDate(i.getDate() + 1)
    ) {
      const date = new Date(i)
      const month = ("0" + (date.getMonth() + 1)).slice(-2)
      const day = ("0" + date.getDate()).slice(-2)
      const year = date.getFullYear()
      const dateString = `${month}/${day}/${year}`
      datesArray.push(dateString)
    }
    return datesArray
  }

  function handleCheckInValue(event: ChangeEvent<HTMLInputElement>) {
    setCheckInDate(event.currentTarget.value)
  }

  function handleCheckOutValue(event: ChangeEvent<HTMLInputElement>) {
    setCheckOutDate(event.currentTarget.value)
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

      const dateRange = createDatesArray(checkInDate, checkOutDate)
      addBookingPeriod(dateRange)

      let vacantCabins = sortedCabins
      if (dateRange.length > 0) {
        vacantCabins = sortedCabins.filter(
          (cabin) => !cabin.occupancy.some((date) => dateRange.includes(date)),
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
    addBookingPeriod,
  ])

  return {
    displayedCabins,
    activeSortMethod,
    setActiveSortMethod,
    handleSearchValue,
    handleCheckInValue,
    handleCheckOutValue,
  }
}
