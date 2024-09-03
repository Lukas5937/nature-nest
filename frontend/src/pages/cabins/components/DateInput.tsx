import { ChangeEvent } from "react"

type DateInputProps = {
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void
  value: string
  placeholder: string
}

export default function DateInput({
  handleChange,
  value,
  placeholder,
}: DateInputProps) {
  return (
    <input
      className="w-64 rounded-xl border border-gray-200 bg-inherit px-4 py-2 text-text placeholder:text-text focus:outline focus:outline-2 focus:outline-green"
      placeholder={placeholder}
      onFocus={(e) => (e.target.type = "date")}
      value={value}
      onChange={handleChange}
    />
  )
}
