import { useRouteError } from "react-router-dom"
import Navigation from "./Navigation"

type RouteError = {
  status: number
  data: {
    message: string
  }
}
export default function ErrorPage() {
  const error = useRouteError() as RouteError
  let title = "An error occurred"
  let message = "Something went wrong."

  if (error.status === 500) {
    message = error.data.message
  }

  if (error.status === 404) {
    title = "Not found"
    message = "Could not find resource or page"
  }

  return (
    <>
      <Navigation />
      <div className="error-box">
        <h1>{title}</h1>
        {message}
      </div>
    </>
  )
}
