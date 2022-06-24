import { body } from 'express-validator';

export const postValidation = [
  body('title', 'Title must be at least 3 characters long')
    .isLength({ min: 3 })
    .isString(),
  body('text', 'Text must be at least 3 characters long')
    .isLength({ min: 10 })
    .isString(),
  body('tags', 'Wrong tags format').optional().isString(),
  body('imageUrl', 'Wrong image path').optional().isString(),
];
