import { Router } from 'express'
import { jwt } from '../middleware/auth.js'
import admin from '../middleware/admin.js'
import { createOrder, getMyOrders, getAllOrders } from '../controllers/orders.js'

const router = Router()

// 建立訂單
router.post('/', jwt, createOrder)
// 取訂單
router.get('/', jwt, getMyOrders)
// 取所有人的訂單
router.get('/all', jwt, admin, getAllOrders)

export default router
