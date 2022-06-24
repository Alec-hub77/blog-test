import express from 'express';
import {
  createPost,
  deletePost,
  getAllPosts,
  getOnePost,
} from '../controllers/postController.js';
import { postValidation } from '../validations/post.js';
import checkAuth from '../utils/checkAuth.js';

const router = express.Router();

// Create post
router.post('/', checkAuth, postValidation, createPost);
router.get('/', getAllPosts);
router.get('/:id', getOnePost);
router.delete('/:id', checkAuth, deletePost);

export default router;
