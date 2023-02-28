import { Router } from 'express'
import content from '../middleware/content.js'
import * as auth from '../middleware/auth.js'
import admin from '../middleware/admin.js'
import { register, login, logout, extend, getUser, editCart, getCart, getAllUsers, editPlantCart, getPlantCart, editUser, editMyself, getMyself } from '../controllers/users.js'

const router = Router()

router.post('/', content('application/json'), register)
router.post('/login', content('application/json'), auth.login, login)
router.delete('/logout', auth.jwt, logout)
// 舊換新(過期的jwt)
router.patch('/extend', auth.jwt, extend)
router.get('/me', auth.jwt, getUser)
router.get('/myself', auth.jwt, getMyself) // 取自己的資料
router.get('/all', auth.jwt, admin, getAllUsers) // 取全部使用者的資料
router.patch('/edituser', auth.jwt, admin, editUser) // 改使用者的資料
router.patch('/editmyself', auth.jwt, editMyself) // 改自己的資料
// 加入購物車
router.post('/cart', content('application/json'), auth.jwt, editCart)
router.get('/cart', auth.jwt, getCart)
// 加入茶樹願望清單
router.post('/plantCart', content('application/json'), auth.jwt, editPlantCart)
router.get('/plantCart', auth.jwt, getPlantCart)
export default router
