import { type CabinsInputProps } from "./SearchInput"

export default function DateInput({ handleChange }: CabinsInputProps) {
  return (
    <input onChange={handleChange} type="date" placeholder="check in date" />
  )
}
