import { Booking } from '../models/bookingsModel.js'
import HttpError from '../models/httpError.js'

export async function fetchBookingsData(userId) {
  let bookings

  try {
    bookings = await Booking.find({ user: userId }).populate('cabin')

    if (!bookings) {
      throw new HttpError(
        'Could not find your bookings, please try again.',
        404
      )
    }
    return bookings
  } catch (err) {
    console.error('Error fetching bookings with populate:', err)
    throw new HttpError(
      'Something went wrong, could not find bookings for your userId.',
      500
    )
  }
}
