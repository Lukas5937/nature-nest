import { ReactNode, useEffect, useRef } from "react"
import { createPortal } from "react-dom"

type ModalProps = {
  children: ReactNode
  open: boolean
}

export default function Modal({ children, open }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const modal = dialogRef.current
    if (open) {
      modal?.showModal()
    }
    return () => modal?.close()
  }, [open])

  const modalRoot = document.querySelector("#modal")

  if (!modalRoot) {
    console.error("Modal root element not found.")
    return
  }

  return createPortal(
    <dialog
      className="w-11/12 max-w-md rounded bg-light p-8 text-darkGreen backdrop:bg-black/15 backdrop:backdrop-blur-sm"
      ref={dialogRef}
    >
      {children}
    </dialog>,
    modalRoot,
  )
}
