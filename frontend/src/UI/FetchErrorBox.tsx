import { type FetchError } from "../http"

export default function FetchErrorBox({ error }: { error: FetchError }) {
  const info = error.info as { message?: string }
  return (
    <div className="error-box">
      <h3>An error occurred.</h3>
      <p>{error.message || "Failed to fetch data, please try again."}</p>
      {info.message && <p>Details: {info.message}</p>}
    </div>
  )
}
