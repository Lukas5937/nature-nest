import { useRef, useEffect } from "react"
import { useOutletContext } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { Loader } from "@googlemaps/js-api-loader"
import {
  type Coordinates,
  type FetchError,
  fetchAPIKey,
} from "../../../util/http"
import LoadingSpinner from "../../../UI/LoadingSpinner"
import FetchErrorBox from "../../../UI/FetchErrorBox"

type CabinDetailsMapContext = {
  coordinates: Coordinates
  _id: string
}

export default function CabinDetailsMap() {
  const { coordinates, _id: id } = useOutletContext<CabinDetailsMapContext>()
  const mapRef = useRef<HTMLDivElement>(null)

  const { data, isPending, isError, error } = useQuery<string, FetchError>({
    queryKey: ["apiKeys"],
    queryFn: fetchAPIKey,
  })

  const apiKey = data

  useEffect(() => {
    if (apiKey) {
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
    }
  }, [apiKey, coordinates, id])

  return (
    <>
      {data && <div className="h-72 w-full" ref={mapRef}></div>}{" "}
      {isPending && <LoadingSpinner />}
      {isError && error && <FetchErrorBox error={error} />}
    </>
  )
}
