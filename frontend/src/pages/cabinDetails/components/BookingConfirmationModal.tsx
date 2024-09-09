import { useContext, useEffect } from "react"
import { ModalContext } from "../../../context/ModalContext"
import { BookingContext } from "../../../context/BookingContext"
import { LoginContext } from "../../../context/LoginContext"

import useCreateBooking from "../hooks/useCreateBooking"
import { type Cabin } from "../../../util/http"

import Modal from "../../../UI/Modal"
import Button from "../../../UI/Button"
import CircularProgress from "@mui/material/CircularProgress"

type BookingConfirmationModalProps = {
  cabin: Cabin
  price: number
}

export default function BookingConfirmationModal({
  cabin,
  price,
}: BookingConfirmationModalProps) {
  const { token } = useContext(LoginContext)
  const { activeModal, hideModal } = useContext(ModalContext)

  const { today, bookingPeriod, totalPrice, addTotalPrice } =
    useContext(BookingContext)

  const { mutate, isPending, isError, error } = useCreateBooking()

  let bookingPeriodStart
  let bookingPeriodEnd
  if (bookingPeriod) {
    bookingPeriodStart = bookingPeriod[0]
    bookingPeriodEnd = bookingPeriod[bookingPeriod.length - 1]
  }

  useEffect(() => {
    if (bookingPeriod) {
      addTotalPrice(price * (bookingPeriod.length - 1))
    }
  }, [price, bookingPeriod, addTotalPrice])

  function createBooking() {
    if (!today || !bookingPeriod || !totalPrice || !token) {
      console.error("Booking information is missing.")
      return
    }

    const bookingData = {
      date: today,
      cabinId: cabin._id,
      bookingPeriod,
      totalPrice,
    }
    mutate({ bookingData, token })
  }

  if (isError && error) {
    console.log(error.message)
    console.log(error.info)
  }

  return (
    <Modal open={activeModal === "bookingConfirmation"} onClose={hideModal}>
      {!isError && (
        <>
          <h2 className="text-lg font-bold text-green">Confirm Your Booking</h2>
          <p className="mt-4 text-sm font-light text-gray-500 xs:text-base">
            Are you sure you want to complete this booking? Please review your
            details before proceeding. Press "Confirm" to finalize your booking.
          </p>
          <div className="mt-6 text-sm xs:text-base">
            <p>Cabin: {cabin.name}</p>
            <p>
              Booking period: {bookingPeriodStart} - {bookingPeriodEnd}
            </p>
            <p>Total price: ${totalPrice}</p>
          </div>
          <div className="mt-6 flex gap-2 text-sm xs:gap-6 xs:text-base">
            <Button type="button" style="modal" handleClick={hideModal}>
              Cancel
            </Button>
            <Button
              style="modalConfirm"
              type="button"
              handleClick={createBooking}
            >
              {isPending ? (
                <div className="relative flex items-center justify-center">
                  <p className="text-transparent">Confirm booking</p>
                  <CircularProgress className="circular-progress" />
                </div>
              ) : (
                "Confirm booking"
              )}
            </Button>
          </div>
        </>
      )}
      {isError && error && (
        <>
          <h2 className="text-lg font-bold text-magenta">An error occurred</h2>
          <p className="mt-4 text-sm font-light text-gray-500 xs:text-base">
            {error.message ||
              "Failed to confirm you booking, please try again."}
          </p>
        </>
      )}
    </Modal>
  )
}
