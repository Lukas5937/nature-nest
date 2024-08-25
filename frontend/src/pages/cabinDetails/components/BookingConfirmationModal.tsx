import { useContext } from "react"
import { ModalContext } from "../../../context/ModalContext"
import Modal from "../../../UI/Modal"
import Button from "../../../UI/Button"

export default function BookingConfirmationModal() {
  const { activeModal, hideModal } = useContext(ModalContext)

  return (
    <Modal open={activeModal === "bookingConfirmation"}>
      <h2 className="text-lg font-bold text-green">Confirm Your Booking</h2>
      <p className="mt-4 font-light text-gray-500">
        Are you sure you want to complete this booking? Please review your
        details before proceeding. Press "Confirm" to finalize your booking.
      </p>
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
