import express from 'express'
import { checkAuth } from '../util/checkAuth.js'
import { check } from 'express-validator'
import { createBooking } from '../controllers/bookingsController.js'

const router = express.Router()

router.use(checkAuth)

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

export default router
