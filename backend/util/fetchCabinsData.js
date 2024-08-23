import { Cabin } from '../models/cabinsModel.js'
import HttpError from '../models/httpError.js'

export async function fetchCabinsData() {
  let cabins

  try {
    cabins = await Cabin.find()
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find cabins data.',
      500
    )
    return next(error)
  }

  if (!cabins) {
    const error = new HttpError(
      'Could not find cabins data, please try again.',
      404
    )
    return next(error)
  }
  return cabins
}
