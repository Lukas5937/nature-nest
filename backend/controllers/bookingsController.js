import { validationResult } from 'express-validator'
import { Booking } from '../models/bookingsModel.js'
import { User } from '../models/usersModel.js'
import { Cabin } from '../models/cabinsModel.js'
import { fetchBookingsData } from '../util/fetchBookingsData.js'
import HttpError from '../models/httpError.js'

export const createBooking = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const error = new HttpError('Invalid data passed, please try again.', 422)
    return next(error)
  }

  const { date, cabinId, bookingPeriod, totalPrice } = req.body
  const { userId } = req.userData

  try {
    const user = await User.findById(userId)
    const cabin = await Cabin.findById(cabinId)

    if (!user || !cabin) {
      const error = new HttpError(
        'An error occurred while loading user or cabin data, please try again.',
        404
      )
      return next(error)
    }

    const newBooking = new Booking({
      user: userId,
      date,
      cabin: cabinId,
      bookingPeriod,
      totalPrice,
    })

    try {
      await newBooking.save()
    } catch (err) {
      const error = new HttpError(
        'An error occurred while saving your booking, please try again later.',
        500
      )
      return next(error)
    }
    user.bookings.push(newBooking._id)
    cabin.occupancy = [...cabin.occupancy, ...bookingPeriod]

    try {
      await user.save()
      await cabin.save()
    } catch (err) {
      const error = new HttpError(
        'An error occurred while updating the user profile or cabin data, please try again later.',
        500
      )
      return next(error)
    }

    return res.status(201).json({ newBooking })
  } catch (err) {
    const error = new HttpError(
      'An unexpected error occurred, please try again later.',
      500
    )
    return next(error)
  }
}

export const getBookings = async (req, res, next) => {
  const userId = req.params.userId
  try {
    const bookings = await fetchBookingsData(userId)
    res.status(200).json({ bookings })
  } catch (err) {
    return next(err)
  }
}
