import express from 'express'
import { check } from 'express-validator'
import { signupUser, loginUser } from '../controllers/usersController.js'

const router = express.Router()

router.post(
  '/login',
  [check('email').isEmail(), check('password').not().isEmpty()],
  loginUser
)
router.post(
  '/signup',
  [
    check('email').isEmail(),
    check('password').not().isEmpty(),
    check('passwordConfirmation').not().isEmpty(),
  ],
  signupUser
)

export default router
