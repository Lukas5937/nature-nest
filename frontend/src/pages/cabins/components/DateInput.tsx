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
  function handleBlur(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.value === "") {
      event.target.type = "text"
    }
  }

  return (
    <input
      className="w-48 max-w-full rounded border border-gray-300 bg-grayCard px-3 py-2 text-sm text-darkGreen placeholder:text-text focus:outline-2 focus:outline-green sm:w-56 sm:text-base"
      placeholder={placeholder}
      onFocus={(event) => (event.target.type = "date")}
      value={value}
      onBlur={handleBlur}
      onChange={handleChange}
    />
  )
}
