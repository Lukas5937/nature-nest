import express from 'express'
import { getCabin, getCabins } from '../controllers/cabinsController.js'

const router = express.Router()

router.get('/', getCabins)

router.get('/:cabinId', getCabin)

export default router
