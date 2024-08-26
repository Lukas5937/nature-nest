import { useContext } from "react"
import { useParams, NavLink, Outlet } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"

import { ModalContext } from "../../context/ModalContext"
import { LoginContext } from "../../context/LoginContext"
import { fetchCabin } from "../../util/http"
import { type Cabin, type FetchError } from "../../util/http"

import CabinImages from "./components/CabinImages"
import FetchErrorBox from "../../UI/FetchErrorBox"
import CircularProgress from "@mui/material/CircularProgress"
import Button from "../../UI/Button"
import LoginFirstModal from "./components/LoginFirstModal"
import BookingConfirmationModal from "./components/BookingConfirmationModal"

export default function CabinDetails() {
  const { cabinId } = useParams()

  const { token } = useContext(LoginContext)
  const { showLoginFirst, showBookingConfirmation } = useContext(ModalContext)

  const { data, isPending, isError, error } = useQuery<Cabin, FetchError>({
    queryKey: ["cabins", cabinId],
    queryFn: ({ signal }) => fetchCabin({ signal, cabinId }),
  })

  let content

  if (isPending) {
    content = (
      <>
        <p>Loading...</p>
        <CircularProgress />
      </>
    )
  }

  if (isError) {
    content = <FetchErrorBox error={error} />
  }

  if (data) {
    const { name, address, price } = data
    content = (
      <>
        <div className="mx-auto flex w-11/12 max-w-screen-xl gap-8">
          <div className="flex w-1/2 flex-col items-start">
            <Button to=".." type="link" style="back">
              Back
            </Button>
            <CabinImages />
          </div>
          <div className="flex w-1/2 flex-col gap-8">
            <div className="flex">
              <div className="flex gap-4">
                <h1>{name}</h1>
                <p>{price}</p>
                <Button
                  handleClick={token ? showBookingConfirmation : showLoginFirst}
                  type="button"
                >
                  Book now
                </Button>
              </div>
            </div>
            <p>{address}</p>
            <nav className="flex gap-8">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "border-b-2 border-stone-300" : ""
                }
                end
                to=""
              >
                Details
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "border-b-2 border-stone-300" : ""
                }
                to="map"
              >
                Maps
              </NavLink>
            </nav>
            <Outlet context={data} />
          </div>
        </div>
        <LoginFirstModal />
        <BookingConfirmationModal cabin={data} price={price} />
      </>
    )
  }

  return <main>{content}</main>
}
