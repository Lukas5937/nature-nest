import express from 'express'
import { checkAuth } from '../util/checkAuth.js'
import { check } from 'express-validator'

const router = express.Router()

router.use(checkAuth)

export default router
