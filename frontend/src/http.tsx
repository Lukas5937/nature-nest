import { QueryClient } from "@tanstack/react-query"

export const queryClient = new QueryClient()

export type FetchError = {
  message: string
  code: number
  info?: unknown
}

export type Coordinates = {
  lat: number
  lng: number
}

export type Cabin = {
  _id: string
  name: string
  address: string
  country: string
  description: string
  price: number
  coordinates: Coordinates
  id: string
  occupancy: string[]
}

export async function fetchCabins({ signal }: { signal?: AbortSignal }) {
  const url = "http://localhost:4000/api/v1/cabins/"

  const response = await fetch(url, { signal })

  if (!response.ok) {
    const error: FetchError = {
      message: "An error occurred while fetching the cabins.",
      code: response.status,
      info: await response.json(),
    }
    throw error
  }

  const { cabins }: { cabins: Cabin[] } = await response.json()

  return cabins
}

export async function fetchCabin({
  signal,
  cabinId,
}: {
  signal?: AbortSignal
  cabinId: string | undefined
}) {
  if (!cabinId) {
    throw new Error("Cabin ID is required.")
  }

  const url = `http://localhost:4000/api/v1/cabins/${cabinId}`

  const response = await fetch(url, { signal })

  if (!response.ok) {
    const error: FetchError = {
      message: "An error occurred while fetching the cabin data.",
      code: response.status,
      info: await response.json(),
    }
    throw error
  }

  const { cabin }: { cabin: Cabin } = await response.json()

  return cabin
}
