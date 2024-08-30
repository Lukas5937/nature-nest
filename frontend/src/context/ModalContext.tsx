import { createContext, useState, type ReactNode } from "react"

type ModalContextProviderProps = {
  children: ReactNode
}

type ModalContextValue = {
  activeModal: string | null
  showLoginFirst: () => void
  showBookingConfirmation: () => void
  showSelectBookingPeriod: () => void
  showUnavailableBookingPeriod: () => void
  hideModal: () => void
}

export const ModalContext = createContext<ModalContextValue>({
  activeModal: null,
  showLoginFirst: () => {},
  showBookingConfirmation: () => {},
  showSelectBookingPeriod: () => {},
  showUnavailableBookingPeriod: () => {},
  hideModal: () => {},
})

export default function ModalContextProvider({
  children,
}: ModalContextProviderProps) {
  const [activeModal, setActiveModal] = useState<
    | "loginFirst"
    | "bookingConfirmation"
    | "selectBookingPeriod"
    | "unavailableBookingPeriod"
    | null
  >(null)

  function showLoginFirst() {
    setActiveModal("loginFirst")
  }

  function showBookingConfirmation() {
    setActiveModal("bookingConfirmation")
  }

  function showSelectBookingPeriod() {
    setActiveModal("selectBookingPeriod")
  }

  function showUnavailableBookingPeriod() {
    setActiveModal("unavailableBookingPeriod")
  }

  function hideModal() {
    setActiveModal(null)
  }

  const value = {
    activeModal,
    showLoginFirst,
    showBookingConfirmation,
    showSelectBookingPeriod,
    showUnavailableBookingPeriod,
    hideModal,
  }
  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
}
