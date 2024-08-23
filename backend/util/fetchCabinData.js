import { Cabin } from '../models/cabinsModel.js'
import HttpError from '../models/httpError.js'

export async function fetchCabinData(cabinId) {
  let cabin

  try {
    cabin = await Cabin.findById(cabinId)
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find cabin data.',
      500
    )
    return next(error)
  }

  if (!cabin) {
    const error = new HttpError(
      'Could not find cabin data, please try again.',
      404
    )
    return next(error)
  }
  return cabin
}
