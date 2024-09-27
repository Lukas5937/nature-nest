import CircularProgress from "@mui/material/CircularProgress"

export default function LoadingSpinner() {
  return (
    <div className="my-4 flex items-center justify-center">
      <CircularProgress className="circular-progress" />
    </div>
  )
}
