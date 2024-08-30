import { useContext } from "react"
import { ModalContext } from "../../../context/ModalContext"
import Modal from "../../../UI/Modal"
import Button from "../../../UI/Button"

export default function SelectBookingPeriodModal() {
  const { activeModal, hideModal } = useContext(ModalContext)

  console.log(activeModal)

  return (
    <Modal open={activeModal === "selectBookingPeriod"} onClose={hideModal}>
      <h2 className="text-lg font-bold text-magenta">
        Please Select a Booking Period
      </h2>
      <p className="mt-4 font-light text-gray-500">
        To complete your booking, please choose a booking period first. You must
        select the dates for your stay before confirming the reservation.
      </p>
      <div className="mt-4 flex gap-6">
        <Button type="button" style="modal" handleClick={hideModal}>
          Close
        </Button>
      </div>
    </Modal>
  )
}
