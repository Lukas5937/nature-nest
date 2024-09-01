import { fetchCabinsData } from '../util/fetchCabinsData.js'
import { fetchCabinData } from '../util/fetchCabinData.js'

export const getCabins = async (req, res, next) => {
  try {
    const cabins = await fetchCabinsData()
    res.status(200).json({ cabins })
  } catch (err) {
    next(err)
  }
}

export const getCabin = async (req, res, next) => {
  const cabinId = req.params.cabinId
  try {
    const cabin = await fetchCabinData(cabinId)
    res.status(200).json({ cabin })
  } catch (err) {
    next(err)
  }
}
