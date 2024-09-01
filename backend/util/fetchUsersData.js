import { User } from '../models/usersModel.js'
import HttpError from '../models/httpError.js'

export async function fetchUsersData() {
  let users

  try {
    users = await User.find()
  } catch (err) {
    throw new HttpError('Something went wrong, could not find user data.', 500)
  }

  if (!users) {
    throw new HttpError('Could not find user data, please try again.', 404)
  }
  return users
}
