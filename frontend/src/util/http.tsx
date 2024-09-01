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

export type LoginUser = {
  email: string
  password: string
}

export async function loginUser(userData: LoginUser) {
  const response = await fetch(`http://localhost:4000/api/v1/users/login`, {
    method: "POST",
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json",
    },
  })

  const responseData = await response.json()

  if (!response.ok) {
    const error: FetchError = {
      message:
        responseData.message || "An error occurred while creating user login.",
      code: response.status,
      info: responseData,
    }
    throw error
  }
  return responseData
}

export type SignUpUser = {
  email: string
  password: string
  passwordConfirmation: string
}

export async function signUpUser(userData: SignUpUser) {
  const response = await fetch(`http://localhost:4000/api/v1/users/signup`, {
    method: "POST",
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json",
    },
  })

  const responseData = await response.json()

  if (!response.ok) {
    const error: FetchError = {
      message:
        responseData.message ||
        "An error occurred while creating a new account.",
      code: response.status,
      info: responseData,
    }
    throw error
  }
  return responseData
}

export type BookingData = {
  date: string
  cabinId: string
  bookingPeriod: string[]
  totalPrice: number
}

export type CreateBookingProps = {
  bookingData: BookingData
  token: string
}

export async function createBooking({
  bookingData,
  token,
}: CreateBookingProps) {
  const response = await fetch(`http://localhost:4000/api/v1/bookings/new`, {
    method: "POST",
    body: JSON.stringify(bookingData),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  })
  const responseData = await response.json()

  if (!response.ok) {
    const error: FetchError = {
      message:
        responseData.message ||
        "An error occurred while confirming your booking.",
      code: response.status,
      info: responseData,
    }
    throw error
  }
  const { newBooking } = responseData
  return newBooking
}

export type BookingsResponseData = {
  _id: string
  user: string
  date: string
  cabin: Cabin
  bookingPeriod: string[]
  totalPrice: number
}

export async function fetchBookings({
  signal,
  token,
}: {
  signal?: AbortSignal
  token: string
}) {
  const url = `http://localhost:4000/api/v1/bookings`

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    signal,
  })

  if (!response.ok) {
    const error: FetchError = {
      message: "An error occurred while fetching your bookings.",
      code: response.status,
      info: await response.json(),
    }
    throw error
  }

  const { bookings }: { bookings: BookingsResponseData[] } =
    await response.json()

  return bookings
}

export type DeleteBookingProps = {
  bookingId: string
  token: string
}

export async function deleteBooking({ bookingId, token }: DeleteBookingProps) {
  const response = await fetch(`http://localhost:4000/api/v1/bookings/delete`, {
    method: "DELETE",
    body: JSON.stringify({ bookingId }),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  })
  const responseData = await response.json()

  if (!response.ok) {
    const error: FetchError = {
      message:
        responseData.message ||
        "An error occurred while deleting your booking.",
      code: response.status,
      info: responseData,
    }
    throw error
  }
  const { message } = responseData
  return message
}
