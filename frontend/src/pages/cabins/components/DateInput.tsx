import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

type DateInputProps = {
  handleChange: (date: Date | null) => void
  value: string | null
  placeholder: string
}

export default function DateInput({
  handleChange,
  value,
  placeholder,
}: DateInputProps) {
  let dateValue: Date | null = null
  if (value) {
    dateValue = new Date(value)
  }

  return (
    <div>
      <DatePicker
        selected={dateValue}
        onChange={(date) => handleChange(date)}
        dateFormat="MM/dd/yyyy"
        placeholderText={placeholder}
        className="w-48 max-w-full rounded border border-gray-300 bg-grayCard px-3 py-2 text-sm text-darkGreen placeholder:text-text focus:outline-2 focus:outline-green sm:w-56 sm:text-base"
      />
    </div>
  )
}
