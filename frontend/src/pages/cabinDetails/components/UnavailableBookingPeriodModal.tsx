import { useContext } from "react"
import { ModalContext } from "../../../context/ModalContext"
import useCabinsFilters from "../../cabins/hooks/useCabinsFilters"
import Modal from "../../../UI/Modal"
import Button from "../../../UI/Button"

export default function UnavailableBookingPeriodModal() {
  const { activeModal, hideModal } = useContext(ModalContext)
  const { handleResetBookingPeriod } = useCabinsFilters()

  function handleModifyBookingPeriod() {
    hideModal()
    handleResetBookingPeriod()
  }

  return (
    <Modal
      open={activeModal === "unavailableBookingPeriod"}
      onClose={hideModal}
    >
      <h2 className="text-lg font-bold text-magenta">
        Booking Period Unavailable
      </h2>
      <p className="mt-4 font-light text-gray-500">
        The selected cabin is already booked for the chosen period. Please
        select a different booking period or choose another cabin.
      </p>
      <div className="mt-4 flex gap-6">
        <Button type="link" style="modal" to="/cabins">
          View All Cabins
        </Button>
        <Button
          type="button"
          style="modal"
          handleClick={handleModifyBookingPeriod}
        >
          Modify Booking Period
        </Button>
      </div>
    </Modal>
  )
}
