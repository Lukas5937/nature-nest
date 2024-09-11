import { useContext } from "react"
import { ModalContext } from "../../../context/ModalContext"
import Modal from "../../../UI/Modal"
import Button from "../../../UI/Button"

export default function InvalidBookingPeriodModal() {
  const { activeModal, hideModal } = useContext(ModalContext)

  return (
    <Modal open={activeModal === "invalidBookingPeriod"} onClose={hideModal}>
      <h2 className="text-lg font-bold text-magenta">Invalid Booking Period</h2>
      <p className="mt-4 text-sm font-light text-gray-500 xs:text-base">
        Please select a valid booking period. Ensure your check-in and check-out
        dates are correct.
      </p>
      <div className="mt-4 flex gap-2 text-sm xs:gap-6">
        <Button type="button" style="modal" handleClick={hideModal}>
          Close
        </Button>
      </div>
    </Modal>
  )
}
