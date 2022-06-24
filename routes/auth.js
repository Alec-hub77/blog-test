import express from 'express';
import {
  registerUser,
  loginUser,
  getMe,
} from '../controllers/authController.js';
import { registerValidation, loginValidation } from '../validations/auth.js';
import checkAuth from '../utils/checkAuth.js';

const router = express.Router();

router.post('/register', registerValidation, registerUser);
router.post('/login', loginValidation, loginUser);
router.get('/me', checkAuth, getMe);

export default router;
