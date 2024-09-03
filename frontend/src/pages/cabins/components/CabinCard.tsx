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
        className="flex h-96 flex-col bg-gray-100 p-4"
        whileHover="hover"
      >
        <div className="relative overflow-hidden">
          {cabin.occupancy.length > 40 && (
            <p className="absolute right-2 top-2 z-20 rounded-lg bg-magenta px-4 py-2 text-sm text-light">
              popular
            </p>
          )}
          <motion.img
            className="h-full w-full rounded object-cover"
            src={img}
            alt={name}
            variants={{
              hover: { scale: 1.05 },
            }}
          />
          <div className="absolute inset-0 z-10 rounded-xl bg-[#7e858c70]"></div>
        </div>
        <div className="my-3 flex justify-between gap-4">
          <motion.div
            variants={{
              hover: { y: -5 },
            }}
          >
            <p className="text-lg font-bold">{name}</p>
            <p>{shortAddress}</p>
            <p>{country}</p>
          </motion.div>
          <div>
            <p className="text-xl font-semibold">${price}</p>
            <p className="mt-[-4px] text-right font-light">/day</p>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}
