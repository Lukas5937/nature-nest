import { type ReactNode } from "react"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "../util/http"
import LoginContextProvider from "./LoginContext"
import ModalContextProvider from "./ModalContext"
import BookingContextProvider from "./BookingContext"

type ContextProvidersProps = {
  children: ReactNode
}

export default function ContextProviders({ children }: ContextProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <LoginContextProvider>
        <ModalContextProvider>
          <BookingContextProvider>{children}</BookingContextProvider>
        </ModalContextProvider>
      </LoginContextProvider>
    </QueryClientProvider>
  )
}
