import { useEffect, useRef, useState, type ChangeEvent } from "react"
import Search from "../../../assets/cabinNavigation/Search.svg"

type CabinsInputProps = {
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export default function SearchInput({ handleChange }: CabinsInputProps) {
  const [searchIsOpen, setSearchIsOpen] = useState(false)
  const searchRef = useRef<HTMLInputElement>(null)

  function handleOpenSearchInput() {
    setSearchIsOpen(true)
  }

  function handleCloseSearchInput() {
    if (
      searchRef.current?.value === undefined ||
      searchRef.current?.value === ""
    )
      setSearchIsOpen(false)
  }

  useEffect(() => {
    if (searchRef?.current) {
      searchRef.current.focus()
    }
  }, [searchIsOpen])

  return (
    <div className="lg:mt-8">
      {!searchIsOpen && (
        <button
          className="flex items-center gap-2 border-b border-gray-300 py-4 text-text hover:border-b hover:border-green lg:mt-0"
          onClick={handleOpenSearchInput}
        >
          <img width="28px" src={Search} alt="" />
          <p className="text-sm sm:text-base">Search Cabins</p>
        </button>
      )}
      {searchIsOpen && (
        <input
          className="border-1 border-b border-gray-300 bg-light px-2 py-4 text-darkGreen placeholder:text-text focus:border-b focus:border-green focus:outline-none lg:w-full"
          id="cabinsSearch"
          type="search"
          ref={searchRef}
          onBlur={handleCloseSearchInput}
          placeholder="Find your destination"
          onChange={handleChange}
        />
      )}
    </div>
  )
}
