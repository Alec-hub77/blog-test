import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import { registerValidation, loginValidation } from '../validations/auth.js';
import UserModel from '../models/User.js';
import checkAuth from '../utils/checkAuth.js';

const router = express.Router();

// Register new user
router.post('/register', registerValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const userPassword = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(userPassword, salt);

    const doc = new UserModel({
      email: req.body.email,
      fullName: req.body.fullName,
      avatarUrl: req.body.avatarUrl,
      password: passwordHash,
    });

    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      'secret_key',
      { expiresIn: '1d' }
    );
    const { password, ...userData } = user._doc;

    res.json({
      userData,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// Login user

router.post('/login', loginValidation, async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: 'Usen not fount' });
    }
    const isValidPassword = await bcrypt.compare(
      req.body.password,
      user._doc.password
    );
    if (!isValidPassword) {
      res.status(400).json({ message: 'Wrong password or email' });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      'secret_key',
      { expiresIn: '1d' }
    );
    const { password, ...userData } = user._doc;
    res.status(200).json({
      token,
      userData,
    });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// User Info

router.get('/me', checkAuth, async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const { password, ...userData } = user._doc;
    res.status(200).json({
      userData,
    });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

export default router;
