import { useContext } from "react"
import { BookingContext } from "../../context/BookingContext"

export default function NewBooking() {
  const { newBooking } = useContext(BookingContext)

  return (
    <>
      {newBooking && (
        <main className="mx-auto mt-12 flex w-11/12 max-w-screen-lg flex-col gap-16">
          <section className="bg-greenCard rounded-lg p-8 text-center shadow-md">
            <h1 className="font-serif text-2xl font-semibold text-darkGreen">
              Booking Successful!
            </h1>
            <p className="text mt-2 text-dark">
              Thank you for choosing us for your stay. We are excited to host
              you and ensure you have a memorable experience.
            </p>
            <div className="mt-6 rounded-lg bg-light p-4 shadow-inner">
              <p className="text-lg">
                Your Booking ID:{" "}
                <strong className="break-words text-magenta xs:text-xl">
                  {newBooking._id}
                </strong>
              </p>
              <p className="text-sm">
                Please save this ID for any future communication.
              </p>
            </div>
          </section>

          <section className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="bg-grayCard rounded-lg p-6 shadow">
              <h2 className="mb-4 font-serif text-xl font-semibold text-darkGreen">
                Booking Details
              </h2>
              <ul className="space-y-3 text-dark">
                <li>
                  <strong className="text-magenta">Booking Date:</strong>{" "}
                  {newBooking.date}
                </li>
                <li>
                  <strong className="text-magenta">Cabin Name:</strong>{" "}
                  {newBooking.cabin.name}
                </li>
                <li>
                  <strong className="text-magenta">Check-in:</strong>{" "}
                  {newBooking.bookingPeriod[0]}
                </li>
                <li>
                  <strong className="text-magenta">Check-out:</strong>{" "}
                  {
                    newBooking.bookingPeriod[
                      newBooking.bookingPeriod.length - 1
                    ]
                  }
                </li>
                <li>
                  <strong className="text-magenta">Total Nights:</strong>{" "}
                  {newBooking.bookingPeriod.length - 1}
                </li>
                <li>
                  <strong className="text-magenta">Total Price:</strong> $
                  {newBooking.totalPrice}
                </li>
              </ul>
            </div>

            <div className="bg-grayCard rounded-lg p-6 shadow">
              <h3 className="mb-4 font-serif text-xl font-semibold text-darkGreen">
                What Happens Next?
              </h3>
              <h4 className="font-bold">Check-in Details:</h4>
              <p>
                You will receive further instructions 24 hours before your
                arrival.
              </p>
              <h4 className="font-bold">Cancellation Policy:</h4>
              <p>
                Please review our cancellation policy in your confirmation
                email.
              </p>
              <h4 className="font-bold">Special Requests:</h4>
              <p>
                Feel free to contact us if you have any specific requirements.
              </p>
            </div>
          </section>
        </main>
      )}
    </>
  )
}
