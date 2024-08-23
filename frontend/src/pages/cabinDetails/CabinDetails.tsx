import { useState } from "react"
import { useParams, NavLink, Outlet } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { fetchCabin } from "../../util/http"
import { type Cabin, type FetchError } from "../../util/http"
import FetchErrorBox from "../../UI/FetchErrorBox"

import Forest from "../../assets/home/Forest.jpg"
import Waterfall from "../../assets/home/Waterfall.jpg"
import WhatWeOffer from "../../assets/home/WhatWeOffer.jpg"
import WhisperingPinesCabin from "../../assets/WhisperingPinesCabin.jpeg"

import CircularProgress from "@mui/material/CircularProgress"

export default function CabinDetails() {
  const { cabinId } = useParams()

  const images = [Forest, Waterfall, WhatWeOffer, WhisperingPinesCabin]
  const [largeImage, setLargeImage] = useState(images[0])
  const smallImages = images.filter((image) => image !== largeImage)

  function handleImageClick(image: string) {
    setLargeImage(image)
  }

  const smallImageButtons = smallImages.map((image) => (
    <li key={image}>
      <button className="h-32 w-full" onClick={() => handleImageClick(image)}>
        <img className="h-full w-full object-cover" src={image} alt="" />
      </button>
    </li>
  ))

  const { data, isPending, isError, error } = useQuery<Cabin, FetchError>({
    queryKey: ["cabins", cabinId],
    queryFn: ({ signal }) => fetchCabin({ signal, cabinId }),
  })

  let content

  if (isPending) {
    content = (
      <>
        <p>Loading...</p>
        <CircularProgress />
      </>
    )
  }

  if (isError) {
    content = <FetchErrorBox error={error} />
  }

  if (data) {
    const { name, address, price } = data
    content = (
      <main>
        <div className="mx-auto flex w-11/12 max-w-screen-xl gap-8">
          <div className="w-1/2">
            <img className="h-96 w-full object-cover" src={largeImage} alt="" />
            <ul className="grid grid-cols-4">{smallImageButtons}</ul>
          </div>
          <div className="flex w-1/2 flex-col gap-8">
            <div className="flex">
              <h1>{name}</h1>
              <p>{price}</p>
            </div>
            <p>{address}</p>
            <nav className="flex gap-8">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "border-b-2 border-stone-300" : ""
                }
                end
                to=""
              >
                Details
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "border-b-2 border-stone-300" : ""
                }
                to="map"
              >
                Maps
              </NavLink>
            </nav>
            <Outlet context={data} />
          </div>
        </div>
      </main>
    )
  }

  return <h2>{content}</h2>
}
