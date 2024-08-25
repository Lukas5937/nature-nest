import { useContext } from "react"
import { ModalContext } from "../../../context/ModalContext"
import { BookingContext } from "../../../context/BookingContext"
import Modal from "../../../UI/Modal"
import Button from "../../../UI/Button"

type BookingConfirmationModalProps = {
  name: string
  price: number
}

export default function BookingConfirmationModal({
  name,
  price,
}: BookingConfirmationModalProps) {
  const { activeModal, hideModal } = useContext(ModalContext)
  const { bookingPeriod, totalPrice, addTotalPrice } =
    useContext(BookingContext)

  let bookingPeriodStart
  let bookingPeriodEnd
  if (bookingPeriod) {
    bookingPeriodStart = bookingPeriod[0]
    bookingPeriodEnd = bookingPeriod[bookingPeriod.length - 1]
    addTotalPrice(price * (bookingPeriod.length - 1))
  }

  return (
    <Modal open={activeModal === "bookingConfirmation"}>
      <h2 className="text-lg font-bold text-green">Confirm Your Booking</h2>
      <p className="mt-4 font-light text-gray-500">
        Are you sure you want to complete this booking? Please review your
        details before proceeding. Press "Confirm" to finalize your booking.
      </p>
      <p>Cabin: {name}</p>
      <p>
        Booking period: {bookingPeriodStart} - {bookingPeriodEnd}
      </p>
      <p>Total price: ${totalPrice}</p>
      <div className="mt-4 flex gap-6">
        <Button type="button" style="modal" handleClick={hideModal}>
          Cancel
        </Button>
        <Button to="/auth" style="modal" type="link">
          Confirm booking
        </Button>
      </div>
    </Modal>
  )
}
