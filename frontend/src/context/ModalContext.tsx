import { createContext, useState, type ReactNode } from "react"

type ModalContextProviderProps = {
  children: ReactNode
}

type ModalContextValue = {
  activeModal: string | null
  showLoginFirst: () => void
  showBookingConfirmation: () => void
  hideModal: () => void
}

export const ModalContext = createContext<ModalContextValue>({
  activeModal: null,
  showLoginFirst: () => {},
  showBookingConfirmation: () => {},
  hideModal: () => {},
})

export default function ModalContextProvider({
  children,
}: ModalContextProviderProps) {
  const [activeModal, setActiveModal] = useState<
    "loginFirst" | "bookingConfirmation" | null
  >(null)

  function showLoginFirst() {
    setActiveModal("loginFirst")
  }

  function showBookingConfirmation() {
    setActiveModal("bookingConfirmation")
  }

  function hideModal() {
    setActiveModal(null)
  }

  const value = {
    activeModal,
    showLoginFirst,
    showBookingConfirmation,
    hideModal,
  }
  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
}
