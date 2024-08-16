import { useState, type ChangeEvent } from "react"
import { useQuery } from "@tanstack/react-query"
import { fetchCabins } from "../../http"
import { type Cabin, type FetchError } from "../../http"

import CabinCard from "./components/CabinCard"
import { CircularProgress } from "@mui/material"
import FetchErrorBox from "../../UI/FetchErrorBox"
import WhisperingPinesCabin from "../../assets/WhisperingPinesCabin.jpeg"
import DateInput from "./components/DateInput"

export default function Cabins() {
  const { data, isPending, isError, error } = useQuery<Cabin[], FetchError>({
    queryKey: ["cabins"],
    queryFn: fetchCabins,
  })

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
  console.log(occupiedDates)

  function handleSearchValue(event: ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.currentTarget.value)
  }

  function handleCheckInValue(event: ChangeEvent<HTMLInputElement>) {
    setCheckInDate(event.currentTarget.value)
  }

  function handleCheckOutValue(event: ChangeEvent<HTMLInputElement>) {
    setCheckOutDate(event.currentTarget.value)
  }

  let searchResults
  if (data) {
    searchResults = data.filter(
      (cabin) =>
        cabin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cabin.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cabin.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cabin.country.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }

  if (isError) {
    return <FetchErrorBox error={error} />
  }

  return (
    <main className="mx-auto my-8 w-11/12 max-w-screen-xl">
      <input type="search" placeholder="Search" onChange={handleSearchValue} />
      <DateInput handleChange={handleCheckInValue} />
      <DateInput handleChange={handleCheckOutValue} />
      {isPending && (
        <>
          <p>Loading...</p>
          <CircularProgress />
        </>
      )}
      {data && (
        <section className="mx-auto max-w-screen-2xl rounded-3xl bg-lightMagenta px-12 py-12">
          <ul className="grid gap-12 sm:grid-cols-2 md:grid-cols-3">
            {searchResults &&
              searchResults.map((result) => (
                <li key={result._id}>
                  <CabinCard cabin={result} img={WhisperingPinesCabin} />
                </li>
              ))}
          </ul>
        </section>
      )}
    </main>
  )
}
