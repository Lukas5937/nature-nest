import { createContext, useState, useCallback, type ReactNode } from "react"

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
  showCancellationConfirmation: () => void
  hideModal: () => void
}

export const ModalContext = createContext<ModalContextValue>({
  activeModal: null,
  showLoginFirst: () => {},
  showBookingConfirmation: () => {},
  showSelectBookingPeriod: () => {},
  showUnavailableBookingPeriod: () => {},
  showInvalidBookingPeriod: () => {},
  showCancellationConfirmation: () => {},
  hideModal: () => {},
})

export default function ModalContextProvider({
  children,
}: ModalContextProviderProps) {
  const [activeModal, setActiveModal] = useState<
    | "loginFirst"
    | "bookingConfirmation"
    | "cancellationConfirmation"
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

  function showCancellationConfirmation() {
    setActiveModal("cancellationConfirmation")
  }

  const hideModal = useCallback(() => {
    setActiveModal(null)
  }, [])

  const value = {
    activeModal,
    showLoginFirst,
    showBookingConfirmation,
    showSelectBookingPeriod,
    showInvalidBookingPeriod,
    showUnavailableBookingPeriod,
    showCancellationConfirmation,
    hideModal,
  }
  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
}
