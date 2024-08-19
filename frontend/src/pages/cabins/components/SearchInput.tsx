import { type ChangeEvent } from "react"

export type CabinsInputProps = {
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export default function SearchInput({ handleChange }: CabinsInputProps) {
  return (
    <input
      className="w-72 rounded-3xl bg-[#F8F1F4] px-8 py-4"
      id="cabinsSearch"
      type="search"
      placeholder="Search destinations"
      onChange={handleChange}
    />
  )
}
