import { Cabin } from '../models/cabinsModel.js'
import HttpError from '../models/httpError.js'

export async function fetchCabinData(cabinId) {
  let cabin

  try {
    cabin = await Cabin.findById(cabinId)
  } catch (err) {
    throw new HttpError('Something went wrong, could not find cabin data.', 500)
  }

  if (!cabin) {
    throw new HttpError('Could not find cabin data, please try again.', 404)
  }
  return cabin
}
