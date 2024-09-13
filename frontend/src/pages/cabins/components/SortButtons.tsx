import { type SortMethods } from "../hooks/useCabinsFilters"

type SortButtonsProps = {
  setActiveSortMethod: React.Dispatch<React.SetStateAction<SortMethods>>
  activeSortMethod: SortMethods
}

export default function SortButtons({
  setActiveSortMethod,
  activeSortMethod,
}: SortButtonsProps) {
  function handleNameClick() {
    setActiveSortMethod("name")
  }
  function handlePriceLowClick() {
    setActiveSortMethod("priceLow")
  }
  function handlePriceHighClick() {
    setActiveSortMethod("priceHigh")
  }
  function handlePopularityClick() {
    setActiveSortMethod("popularity")
  }

  const styles =
    "relative rounded border border-gray-300 bg-grayCard px-3 py-2 text-sm text-dark cursor-pointer focus:outline-none"
  const activeStyles =
    "relative rounded border border-gray-300 bg-greenCard px-3 py-2 text-sm text-darkGreen cursor-pointer outline outline-2 outline-green"

  return (
    <fieldset className="mt-8 grid grid-cols-2 items-start gap-2 text-sm xs:flex sm:text-base lg:mt-12 lg:grid lg:grid-cols-2 lg:items-stretch">
      <legend className="mb-2 text-text">Sort options</legend>
      <label className={activeSortMethod === "name" ? activeStyles : styles}>
        Name
        <input
          className="absolute bottom-0 left-0 right-0 top-0 opacity-0"
          onChange={handleNameClick}
          type="radio"
          name="sortInput"
          checked={activeSortMethod === "name"}
        />
      </label>
      <label
        className={activeSortMethod === "popularity" ? activeStyles : styles}
      >
        Popularity
        <input
          className="absolute bottom-0 left-0 right-0 top-0 opacity-0"
          onChange={handlePopularityClick}
          type="radio"
          name="sortInput"
          checked={activeSortMethod === "popularity"}
        />
      </label>
      <label
        className={activeSortMethod === "priceLow" ? activeStyles : styles}
      >
        Price ↑
        <input
          className="absolute bottom-0 left-0 right-0 top-0 opacity-0"
          onChange={handlePriceLowClick}
          type="radio"
          name="sortInput"
          checked={activeSortMethod === "priceLow"}
        />
      </label>
      <label
        className={activeSortMethod === "priceHigh" ? activeStyles : styles}
      >
        Price ↓
        <input
          className="absolute bottom-0 left-0 right-0 top-0 opacity-0"
          onChange={handlePriceHighClick}
          type="radio"
          name="sortInput"
          checked={activeSortMethod === "priceHigh"}
        />
      </label>
    </fieldset>
  )
}
