import { type ReactNode } from "react"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "../util/http"
import LoginContextProvider from "./LoginContext"

type ContextProvidersProps = {
  children: ReactNode
}

export default function ContextProviders({ children }: ContextProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <LoginContextProvider>{children}</LoginContextProvider>
    </QueryClientProvider>
  )
}
