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
  showInvalidBookingPeriod: () => void
  hideModal: () => void
}

export const ModalContext = createContext<ModalContextValue>({
  activeModal: null,
  showLoginFirst: () => {},
  showBookingConfirmation: () => {},
  showSelectBookingPeriod: () => {},
  showUnavailableBookingPeriod: () => {},
  showInvalidBookingPeriod: () => {},
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
    | "invalidBookingPeriod"
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

  function showInvalidBookingPeriod() {
    setActiveModal("invalidBookingPeriod")
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
    showInvalidBookingPeriod,
    showUnavailableBookingPeriod,
    hideModal,
  }
  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
}
