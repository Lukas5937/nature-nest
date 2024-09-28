import { ReactNode, useEffect, useRef } from "react"
import { createPortal } from "react-dom"

type ModalProps = {
  children: ReactNode
  open: boolean
  onClose: () => void
}

export default function Modal({ children, open, onClose }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const modal = dialogRef.current
    if (open) {
      modal?.showModal()
    } else {
      modal?.close()
    }
    return () => {
      if (!open) {
        modal?.close()
      }
    }
  }, [open])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const modal = dialogRef.current
      const target = event.target as Node

      if (open && modal && target === modal) {
        onClose()
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [onClose, open])

  const modalRoot = document.querySelector("#modal")

  if (!modalRoot) {
    console.error("Modal root element not found.")
    return null
  }

  return createPortal(
    <dialog
      className="w-11/12 max-w-md overflow-auto rounded bg-light text-darkGreen backdrop:bg-black/15 backdrop:backdrop-blur-sm"
      ref={dialogRef}
      onClose={onClose}
    >
      <div className="p-8">{children}</div>
    </dialog>,
    modalRoot,
  )
}
