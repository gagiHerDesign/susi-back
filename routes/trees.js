import { Router } from 'express'
import content from '../middleware/content.js'
import admin from '../middleware/admin.js'
import upload from '../middleware/upload.js'
import { jwt } from '../middleware/auth.js'
import { createTree, getAllTrees, getTree, getSellTrees, editTree } from '../controllers/trees.js'

const router = Router()

router.post('/', content('multipart/form-data'), jwt, admin, upload, createTree)
router.get('/', getSellTrees)
// 一定要先 all 再 id !
router.get('/all', jwt, admin, getAllTrees)
router.get('/:id', getTree)
router.patch('/:id', content('multipart/form-data'), jwt, admin, upload, editTree)

export default router
