import { Router } from 'express'
import { jwt } from '../middleware/auth.js'
import admin from '../middleware/admin.js'
import { createMyplant, getMyPlants, getAllMyPlants } from '../controllers/myplants.js'

const router = Router()

// 建立訂單
router.post('/', jwt, createMyplant)
// 取訂單
router.get('/', jwt, getMyPlants)
// 取所有人的訂單
router.get('/all', jwt, admin, getAllMyPlants)

export default router
