import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { ModalContext } from "../../../context/ModalContext"
import Modal from "../../../UI/Modal"
import Button from "../../../UI/Button"

export default function LoginFirstModal() {
  const { activeModal, hideModal } = useContext(ModalContext)

  const navigate = useNavigate()

  function handleGoToLogin() {
    navigate("/auth?mode=login")
    hideModal()
  }

  return (
    <Modal open={activeModal === "loginFirst"} onClose={hideModal}>
      <h2 className="text-lg font-bold text-magenta">Login Required</h2>
      <p className="mt-4 text-sm font-light text-gray-500 xs:text-base">
        Please log in to complete your booking. If you don't have an account,
        click the button below to create one.
      </p>
      <div className="mt-4 flex gap-2 text-sm xs:gap-4 xs:text-base">
        <Button type="button" style="modal" handleClick={hideModal}>
          Close
        </Button>
        <Button style="modal" type="button" handleClick={handleGoToLogin}>
          Go to Login
        </Button>
      </div>
    </Modal>
  )
}
