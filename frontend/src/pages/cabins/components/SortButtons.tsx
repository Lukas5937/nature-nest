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

  return (
    <div className="flex flex-col gap-4">
      <div className="relative">
        <label htmlFor="name">
          <div className="w-full rounded-3xl bg-[#F8F1F4] px-8 py-2">
            <p className="">Name</p>
          </div>
        </label>
        <input
          className="absolute opacity-0"
          onChange={handleNameClick}
          id="name"
          type="radio"
          name="sortInput"
          checked={activeSortMethod === "name"}
        />
      </div>
      <div className="relative">
        <label htmlFor="priceLow">
          <div className="w-full rounded-3xl bg-[#F8F1F4] px-8 py-2">
            <p className="">Price: low to high</p>
          </div>
        </label>
        <input
          className="absolute opacity-0"
          onChange={handlePriceLowClick}
          id="priceLow"
          type="radio"
          name="sortInput"
          checked={activeSortMethod === "priceLow"}
        />
      </div>
      <div className="relative">
        <label htmlFor="priceHigh">
          <div className="w-full rounded-3xl bg-[#F8F1F4] px-8 py-2">
            <p className="">Price: high to low</p>
          </div>
        </label>
        <input
          className="absolute opacity-0"
          onChange={handlePriceHighClick}
          id="priceHigh"
          type="radio"
          name="sortInput"
          checked={activeSortMethod === "priceHigh"}
        />
      </div>
      <div className="relative">
        <label htmlFor="popularity">
          <div className="w-full rounded-3xl bg-[#F8F1F4] px-8 py-2">
            <p className="">Popularity</p>
          </div>
        </label>
        <input
          className="absolute opacity-0"
          onChange={handlePopularityClick}
          id="popularity"
          type="radio"
          name="sortInput"
          checked={activeSortMethod === "popularity"}
        />
      </div>
    </div>
  )
}
