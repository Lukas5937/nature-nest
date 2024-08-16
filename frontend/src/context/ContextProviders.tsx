import { type ReactNode } from "react"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "../http"

type ContextProvidersProps = {
  children: ReactNode
}

export default function ContextProviders({ children }: ContextProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
