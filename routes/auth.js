import express from 'express';
import {
  registerUser,
  loginUser,
  getMe,
} from '../controllers/authController.js';
import { registerValidation, loginValidation } from '../validations/auth.js';
import checkAuth from '../utils/checkAuth.js';
import handleValidationError from '../utils/handleValidationError.js';

const router = express.Router();

router.post(
  '/register',
  registerValidation,
  handleValidationError,
  registerUser
);
router.post('/login', loginValidation, handleValidationError, loginUser);
router.get('/me', checkAuth, getMe);

export default router;
