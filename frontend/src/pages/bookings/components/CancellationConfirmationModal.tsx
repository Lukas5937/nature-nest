import { useContext } from "react"
import { ModalContext } from "../../../context/ModalContext"
import { LoginContext } from "../../../context/LoginContext"
import useDeleteBooking from "../hooks/useDeleteBooking"

import Modal from "../../../UI/Modal"
import Button from "../../../UI/Button"
import CircularProgress from "@mui/material/CircularProgress"

type DeleteConfirmationModalProps = {
  bookingId: string
}

export default function CancellationConfirmationModal({
  bookingId,
}: DeleteConfirmationModalProps) {
  const { activeModal, hideModal } = useContext(ModalContext)
  const { token } = useContext(LoginContext)

  const { mutate, isPending, isError, error } = useDeleteBooking()

  function deleteBooking() {
    if (token) {
      mutate({ bookingId, token })
      hideModal()
    }
  }

  return (
    <Modal
      open={activeModal === "cancellationConfirmation"}
      onClose={hideModal}
    >
      {!isError && (
        <>
          <h2 className="text-lg font-bold text-magenta">
            Confirm Cancellation
          </h2>
          <p className="mt-4 text-sm font-light text-gray-500 xs:text-base">
            Are you sure you want to cancel this booking? Please note that once
            cancelled, this action cannot be undone and your reservation will be
            permanently removed.
          </p>
          <div className="mt-6 flex gap-2 text-sm xs:gap-6 xs:text-base">
            <Button type="button" style="modal" handleClick={hideModal}>
              Cancel
            </Button>
            <Button
              style="modalDelete"
              type="button"
              handleClick={deleteBooking}
            >
              {isPending ? (
                <div className="relative flex items-center justify-center">
                  <p className="text-transparent">Confirm Cancellation</p>
                  <CircularProgress className="circular-progress" />
                </div>
              ) : (
                "Confirm Cancellation"
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
              "Failed to confirm you cancellation, please try again."}
          </p>
        </>
      )}
    </Modal>
  )
}
