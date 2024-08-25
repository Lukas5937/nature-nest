import { useContext } from "react"
import { ModalContext } from "../../../context/ModalContext"
import Modal from "../../../UI/Modal"
import Button from "../../../UI/Button"

export default function LoginFirstModal() {
  const { activeModal, hideModal } = useContext(ModalContext)

  return (
    <Modal open={activeModal === "loginFirst"}>
      <h2 className="text-lg font-bold text-magenta">Login Required</h2>
      <p className="mt-4 font-light text-gray-500">
        Please log in to complete your booking. If you don't have an account,
        click the button below to create one.
      </p>
      <div className="mt-4 flex gap-6">
        <Button type="button" style="modal" handleClick={hideModal}>
          Close
        </Button>
        <Button to="/auth" style="modal" type="link">
          Log In to Continue
        </Button>
      </div>
    </Modal>
  )
}
