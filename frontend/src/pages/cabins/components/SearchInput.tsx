import { type ChangeEvent } from "react"

type CabinsInputProps = {
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export default function SearchInput({ handleChange }: CabinsInputProps) {
  return (
    <input
      className="border-1 w-64 rounded-xl border border-gray-200 bg-inherit px-4 py-4 placeholder:text-text focus:outline focus:outline-2 focus:outline-green"
      id="cabinsSearch"
      type="search"
      placeholder="Search destinations"
      onChange={handleChange}
    />
  )
}
