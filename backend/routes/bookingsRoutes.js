import express from 'express'
import { checkAuth } from '../util/checkAuth.js'
import { check } from 'express-validator'
import {
  createBooking,
  getBookings,
  deleteBooking,
} from '../controllers/bookingsController.js'

const router = express.Router()

router.use(checkAuth)

router.get('/', getBookings)

router.post(
  '/new',
  [
    check('date').not().isEmpty(),
    check('cabinId').not().isEmpty(),
    check('bookingPeriod').not().isEmpty(),
    check('totalPrice').not().isEmpty(),
  ],
  createBooking
)

router.delete('/delete', [check('bookingId').not().isEmpty()], deleteBooking)

export default router
