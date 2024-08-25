import { useState } from "react"

import Forest from "../../../assets/home/Forest.jpg"
import Waterfall from "../../../assets/home/Waterfall.jpg"
import WhatWeOffer from "../../../assets/home/WhatWeOffer.jpg"
import WhisperingPinesCabin from "../../../assets/WhisperingPinesCabin.jpeg"

export default function CabinImages() {
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

  return (
    <>
      <img className="mt-4 h-96 w-full object-cover" src={largeImage} alt="" />
      <ul className="grid grid-cols-4">{smallImageButtons}</ul>
    </>
  )
}
