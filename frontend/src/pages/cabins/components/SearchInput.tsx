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
    <div className="row-start-1 lg:mt-8">
      {!searchIsOpen && (
        <button
          className="flex items-center gap-2 border-b border-gray-200 py-4 hover:border-b hover:border-text lg:mt-0"
          onClick={handleOpenSearchInput}
        >
          <img width="28px" src={Search} alt="" />
          <p className="text-base sm:text-lg">Search Cabins</p>
        </button>
      )}
      {searchIsOpen && (
        <input
          className="border-1 border-b border-gray-200 bg-inherit py-4 placeholder:text-text focus:border-b focus:border-green focus:outline-none"
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
