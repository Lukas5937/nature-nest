import jwt from 'jsonwebtoken'
import HttpError from '../models/httpError.js'

export const checkAuth = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next()
  }
  try {
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
      const error = new HttpError('Authentication failed', 401)
      return next(error)
    }
    const decodedToken = jwt.verify(token, process.env.JWT_KEY)
    req.userData = { userId: decodedToken.userId }
    next()
  } catch (err) {
    const error = new HttpError('Authentication failed', 401)
    return next(error)
  }
}
