import { User } from '../models/usersModel.js'
import HttpError from '../models/httpError.js'

export async function fetchUsersData() {
  let users

  try {
    users = await User.find()
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find user data.',
      500
    )
    return next(error)
  }

  if (!users) {
    const error = new HttpError(
      'Could not find user data, please try again.',
      404
    )
    return next(error)
  }
  return users
}
