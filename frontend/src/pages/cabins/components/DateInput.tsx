import { type ChangeEvent } from "react"

type DateInputProps = {
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export default function DateInput({ handleChange }: DateInputProps) {
  return (
    <input onChange={handleChange} type="date" placeholder="check in date" />
  )
}
