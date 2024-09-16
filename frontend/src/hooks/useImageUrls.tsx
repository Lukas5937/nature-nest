import { Cabin } from "../util/http"

export default function useImageURLs() {
  function createCoverImageUrl(cabin: Cabin) {
    const cabinDirectoryName = cabin.name.split(" ").join("_")

    const coverImageUrl = new URL(
      `/assets/cabins/${cabinDirectoryName}/cover-image/Image1.jpeg`,
      window.location.origin,
    ).href
    return coverImageUrl
  }

  function createGalleryImageUrls(cabin: Cabin) {
    const cabinDirectoryName = cabin.name.split(" ").join("_")
    const galleryImageUrls: string[] = []

    for (let i = 2; i <= 5; i++) {
      const galleryImageUrl = new URL(
        `/assets/cabins/${cabinDirectoryName}/gallery-images/Image${i}.jpeg`,
        window.location.origin,
      ).href
      galleryImageUrls.push(galleryImageUrl)
    }
    return galleryImageUrls
  }

  return { createCoverImageUrl, createGalleryImageUrls }
}
