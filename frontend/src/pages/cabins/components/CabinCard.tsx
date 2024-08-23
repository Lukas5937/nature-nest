import { Link } from "react-router-dom"
import { type Cabin } from "../../../util/http"

export default function CabinCard({
  cabin,
  img,
}: {
  cabin: Cabin
  img: string
}) {
  const { _id: id, name, address, country, price } = cabin
  const shortAddress = address.split(",")[1]

  return (
    <div className="flex flex-col">
      <Link to={id}>
        <div className="relative h-80">
          {cabin.occupancy.length > 40 && (
            <p className="absolute right-2 top-2 z-20 rounded-lg bg-magenta px-4 py-2 text-sm text-light">
              popular
            </p>
          )}
          <img
            className="h-full w-full rounded object-cover"
            src={img}
            alt={name}
          />
          <div className="absolute inset-0 z-10 bg-[#30423350]"></div>
        </div>
        <div className="my-2 flex justify-between gap-4">
          <div>
            <p className="text-2xl font-semibold text-[#026397]">{name}</p>
            <p className="mt-2">{shortAddress}</p>
            <p>{country}</p>
          </div>
          <div>
            <p className="text-darkGreen text-2xl font-semibold">${price}</p>
            <p className="mt-[-4px] text-right font-light">/day</p>
          </div>
        </div>
      </Link>
    </div>
  )
}
