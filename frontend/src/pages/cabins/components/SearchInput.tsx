import { type ChangeEvent } from "react"

export type CabinsInputProps = {
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export default function SearchInput({ handleChange }: CabinsInputProps) {
  return (
    <div>
      <label htmlFor="cabinsSearch">Search</label>
      <input id="cabinsSearch" type="search" onChange={handleChange} />
    </div>
  )
}
