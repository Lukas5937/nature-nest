import { useMutation } from "@tanstack/react-query"
import { queryClient } from "../../../util/http"
import {
  deleteBooking,
  type DeleteBookingProps,
  type FetchError,
  type BookingData,
} from "../../../util/http"
import {} from "../../../util/http"

export default function useDeleteBooking() {
  const { mutate, isPending, isError, error } = useMutation<
    BookingData,
    FetchError,
    DeleteBookingProps
  >({
    mutationFn: deleteBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] })
    },
  })

  return { mutate, isPending, isError, error }
}
