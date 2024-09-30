import { useState } from "react"
import { type Cabin } from "../../../util/http"
import useImageURLs from "../../../hooks/useImageUrls"

export default function CabinImages({ cabin }: { cabin: Cabin }) {
  const { createCoverImageUrl, createGalleryImageUrls } = useImageURLs()

  const images = createGalleryImageUrls(cabin)
  images.unshift(createCoverImageUrl(cabin))
  const [largeImage, setLargeImage] = useState(createCoverImageUrl(cabin))
  const smallImages = images.filter((image) => image !== largeImage)

  function handleImageClick(image: string) {
    setLargeImage(image)
  }

  const smallImageButtons = smallImages.map((image, index) => (
    <li key={image}>
      <button className="h-full w-full" onClick={() => handleImageClick(image)}>
        <img
          className="h-full w-full object-cover"
          src={image}
          alt={`Image ${index + 2} of ${cabin.name}`}
        />
      </button>
    </li>
  ))

  return (
    <div className="flex h-full flex-col gap-4">
      <img
        className="h-full min-h-0 object-cover"
        src={largeImage}
        alt={`Main image of ${cabin.name}`}
      />
      <ul className="mt-auto grid grid-cols-4 gap-2">{smallImageButtons}</ul>
    </div>
  )
}
