import mongoose from 'mongoose'

const Schema = mongoose.Schema

const bookingSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: String, required: true },
  cabin: { type: Schema.Types.ObjectId, ref: 'Cabin', required: true },
  bookingPeriod: { type: Array, required: true },
  totalPrice: { type: Number, required: true },
})

export const Booking = mongoose.model('Booking', bookingSchema)
