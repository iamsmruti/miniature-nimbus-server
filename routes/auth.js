import express from 'express'
const router = express.Router()

import { loginUser , registerUser, logoutUser } from '../controllers/auth.js'

router.post('/register', registerUser )
router.post('/login', loginUser)
router.post('/logout', logoutUser)


export default router