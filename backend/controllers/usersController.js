import { validationResult } from 'express-validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { fetchUsersData } from '../util/fetchUsersData.js'
import { User } from '../models/usersModel.js'
import HttpError from '../models/httpError.js'

export const loginUser = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const error = new HttpError('Invalid data passed, please try again.', 422)
    return next(error)
  }

  const { email, password } = req.body
  let users
  try {
    users = await fetchUsersData()
  } catch (err) {
    const error = new HttpError(
      ('Something went wrong, could not find user data.', 500)
    )
    return next(error)
  }
  const userExists = users.some((user) => user.email === email)

  if (!userExists) {
    const error = new HttpError(
      'We cannot find an account with the provided email address. Please sign up instead.',
      409
    )
    return next(error)
  }

  if (userExists) {
    const user = users.find((user) => user.email === email)
    let passwordIsCorrect = false
    try {
      passwordIsCorrect = await bcrypt.compare(password, user.password)
    } catch (err) {
      const error = new HttpError('Login failed, please try again later.', 500)
      return next(error)
    }

    if (!passwordIsCorrect) {
      const error = new HttpError('Password incorrect. Please try again.', 400)
      return next(error)
    }
    if (passwordIsCorrect) {
      let token
      try {
        token = jwt.sign(
          { userId: user.id, email: user.email },
          process.env.JWT_KEY,
          { expiresIn: '1h' }
        )
      } catch (err) {
        const error = new HttpError(
          'Login failed, please try again later.',
          500
        )
        return next(error)
      }
      return res.status(201).json({
        id: user.id,
        email: user.email,
        bookings: user.bookings,
        token,
      })
    }
  }
}

export const signupUser = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const error = new HttpError('Invalid data passed, please try again.', 422)
    return next(error)
  }

  const { email, password, passwordConfirmation } = req.body
  let users
  try {
    users = await fetchUsersData()
  } catch (err) {
    const error = new HttpError(
      ('Something went wrong, could not find user data.', 500)
    )
    return next(error)
  }
  const userExists = users.some((user) => user.email === email)
  const passwordConfirmed = password === passwordConfirmation

  if (userExists) {
    const error = new HttpError(
      'An account with the provided email address already exists, please login instead.',
      409
    )
    return next(error)
  }

  if (!passwordConfirmed) {
    const error = new HttpError(
      "Your passwords don't match. Please confirm your password.",
      400
    )
    return next(error)
  }

  let hashedPassword
  try {
    hashedPassword = await bcrypt.hash(password, 12)
  } catch (err) {
    const error = new HttpError('Could not create user, please try again.', 500)
    return next(error)
  }

  if (!userExists && passwordConfirmed) {
    const newUser = new User({
      email,
      password: hashedPassword,
      bookings: [],
    })

    try {
      await newUser.save()
    } catch (err) {
      const error = new HttpError(
        'Signing up failed, please try again later.',
        500
      )
      return next(error)
    }

    let token
    try {
      token = jwt.sign(
        { userId: newUser.id, email: newUser.email },
        process.env.JWT_KEY,
        { expiresIn: '1h' }
      )
    } catch (err) {
      const error = new HttpError(
        'Signing up failed, please try again later.',
        500
      )
      return next(error)
    }

    return res.status(201).json({
      id: newUser.id,
      email: newUser.email,
      bookings: newUser.bookings,
      token,
    })
  }
}
