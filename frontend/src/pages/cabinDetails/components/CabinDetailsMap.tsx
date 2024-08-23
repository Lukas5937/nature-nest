import { useRef, useEffect } from "react"
import { useOutletContext } from "react-router-dom"
import { Loader } from "@googlemaps/js-api-loader"
import { type Coordinates } from "../../../util/http"

type CabinDetailsMapContext = {
  coordinates: Coordinates
  _id: string
}

export default function CabinDetailsMap() {
  const { coordinates, _id: id } = useOutletContext<CabinDetailsMapContext>()
  const mapRef = useRef<HTMLDivElement>(null)
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

  useEffect(() => {
    const loader = new Loader({
      apiKey: apiKey,
      version: "weekly",
    })

    loader
      .load()
      .then(async () => {
        const { Map } = (await google.maps.importLibrary(
          "maps",
        )) as google.maps.MapsLibrary
        const { AdvancedMarkerElement } = (await google.maps.importLibrary(
          "marker",
        )) as google.maps.MarkerLibrary
        const map = new Map(mapRef.current as HTMLDivElement, {
          center: coordinates,
          zoom: 12,
          mapId: id,
        })
        new AdvancedMarkerElement({
          map,
          position: coordinates,
        })
      })
      .catch((error) => {
        console.log(`Failed loading Google Maps API: ${error}`)
      })
  }, [apiKey, coordinates, id])

  return <div className="h-full w-full" ref={mapRef}></div>
}
