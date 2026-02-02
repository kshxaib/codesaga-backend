import express from 'express';
<<<<<<< HEAD
import { changePassword, checkUniqueUsername, forgotPassword, login, logout, register, verifyOtp } from '../controllers/auth.controller.js';
=======
import { check, login, logout, register } from '../controllers/auth.contoller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
>>>>>>> b8e1e5f (models and auth completed)

const authRoutes = express.Router();

authRoutes.post('/register', register)
<<<<<<< HEAD
authRoutes.post('/login',login)
authRoutes.post('/logout', logout)
authRoutes.post('/forgot-password', forgotPassword)
authRoutes.post('/verify-otp/:email', verifyOtp)
authRoutes.post('/change-password', changePassword)
authRoutes.get('/check-username', checkUniqueUsername)
// authRoutes.post('/google/register', googleRegister)
// authRoutes.post('/google/login', googleLogin)
=======
authRoutes.post('/login', login)
authRoutes.post('/logout', authMiddleware, logout)
authRoutes.get('/check', authMiddleware, check)
>>>>>>> b8e1e5f (models and auth completed)

export default authRoutes;