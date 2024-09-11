import { Link } from "react-router-dom"
import { type Cabin } from "../../../util/http"
import { motion } from "framer-motion"

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
    <Link to={id}>
      <motion.div
        className="bg-grayCard flex h-96 flex-col rounded-lg p-6 shadow-lg"
        whileHover="hover"
      >
        <div className="relative overflow-hidden rounded-lg">
          {cabin.occupancy.length > 40 && (
            <p className="absolute right-2 top-2 z-20 rounded-md bg-magenta px-3 py-1 text-sm text-light">
              Popular
            </p>
          )}
          <motion.img
            className="h-full w-full rounded-lg object-cover"
            src={img}
            alt={name}
            variants={{
              hover: { scale: 1.05 },
            }}
          />
        </div>
        <div className="mt-4 flex justify-between gap-6">
          <motion.div
            variants={{
              hover: { y: -5 },
            }}
          >
            <p className="text-lg font-semibold text-darkGreen">{name}</p>
            <p className="text-sm text-dark">{shortAddress}</p>
            <p className="text-sm text-dark">{country}</p>
          </motion.div>
          <div>
            <p className="text-xl font-bold text-magenta">${price}</p>
            <p className="text-right text-sm font-light text-dark">/day</p>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}
