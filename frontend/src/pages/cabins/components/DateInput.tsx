import { type CabinsInputProps } from "./SearchInput"

export default function DateInput({ handleChange }: CabinsInputProps) {
  return (
    <input
      placeholder="check in date"
      className="text-text w-72 rounded-3xl bg-[#EDF2EF] px-8 py-4"
      type="text"
      onChange={handleChange}
      onFocus={(e) => (e.target.type = "date")}
      onBlur={(e) => (e.target.type = "text")}
    />
  )
}
