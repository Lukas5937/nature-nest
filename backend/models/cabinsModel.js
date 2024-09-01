import mongoose from 'mongoose'

const Schema = mongoose.Schema

const cabinSchema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  coordinates: { type: Object, required: true },
  occupancy: { type: Array, required: true },
})

export const Cabin = mongoose.model('Cabin', cabinSchema)
