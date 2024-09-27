import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { ModalContext } from "../../../context/ModalContext"
import Modal from "../../../UI/Modal"
import Button from "../../../UI/Button"

export default function UnavailableBookingPeriodModal() {
  const { activeModal, hideModal } = useContext(ModalContext)

  const navigate = useNavigate()

  function handleViewAllCabins() {
    navigate("/cabins")
    hideModal()
  }

  return (
    <Modal
      open={activeModal === "unavailableBookingPeriod"}
      onClose={hideModal}
    >
      <h2 className="text-lg font-bold text-magenta">
        Booking Period Unavailable
      </h2>
      <p className="mt-4 text-sm font-light text-gray-500 xs:text-base">
        The selected cabin is already booked for the chosen period. Please
        select a different booking period or choose another cabin.
      </p>
      <div className="mt-4 flex gap-4 text-sm xs:text-base">
        <Button type="button" style="modal" handleClick={handleViewAllCabins}>
          View All Cabins
        </Button>
        <Button type="button" style="modal" handleClick={hideModal}>
          Modify Booking Period
        </Button>
      </div>
    </Modal>
  )
}
