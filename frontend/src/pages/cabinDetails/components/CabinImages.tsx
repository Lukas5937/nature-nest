import { useState } from "react"

import WhisperingPinesCabin from "../../../assets/cabin/WhisperingPinesCabin.jpeg"
import Image2 from "../../../assets/cabin/Image2.jpeg"
import Image3 from "../../../assets/cabin/Image3.jpeg"
import Image4 from "../../../assets/cabin/Image4.jpeg"
import Image5 from "../../../assets/cabin/Image5.jpeg"

export default function CabinImages() {
  const images = [WhisperingPinesCabin, Image2, Image3, Image4, Image5]
  const [largeImage, setLargeImage] = useState(images[0])
  const smallImages = images.filter((image) => image !== largeImage)

  function handleImageClick(image: string) {
    setLargeImage(image)
  }

  const smallImageButtons = smallImages.map((image) => (
    <li key={image}>
      <button className="h-full w-full" onClick={() => handleImageClick(image)}>
        <img className="h-full w-full object-cover" src={image} alt="" />
      </button>
    </li>
  ))

  return (
    <div className="flex h-full flex-col gap-4">
      <img className="h-full min-h-0 object-cover" src={largeImage} alt="" />
      <ul className="mt-auto grid grid-cols-4 gap-2">{smallImageButtons}</ul>
    </div>
  )
}
