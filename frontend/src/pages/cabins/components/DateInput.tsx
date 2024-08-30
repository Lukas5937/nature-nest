import { ChangeEvent } from "react"

type DateInputProps = {
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void
  value: string
}

export default function DateInput({ handleChange, value }: DateInputProps) {
  return (
    <input
      className="w-72 rounded-3xl bg-[#EDF2EF] px-8 py-4 text-text"
      type="date"
      value={value}
      onChange={handleChange}
    />
  )
}
