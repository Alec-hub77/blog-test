import express from 'express';
import {
  createPost,
  deletePost,
  getAllPosts,
  getOnePost,
  updatePost,
} from '../controllers/postController.js';
import { postValidation } from '../validations/post.js';
import checkAuth from '../utils/checkAuth.js';
import multer from 'multer';
import handleValidationError from '../utils/handleValidationError.js';

const router = express.Router();

//  File upload

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

router.post('/', checkAuth, postValidation, handleValidationError, createPost);
router.get('/', getAllPosts);
router.get('/:id', getOnePost);
router.delete('/:id', checkAuth, deletePost);
router.patch(
  '/:id',
  checkAuth,
  postValidation,
  handleValidationError,
  updatePost
);

router.post('/upload', upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

export default router;
