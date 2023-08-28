import {body} from 'express-validator';

export const bodyValidator = [
  body('name').notEmpty().withMessage('the name shouldn\'t be empty'),
  body('description').notEmpty().withMessage('the description shouldn\'t be empty'),
  body('amount').custom(input => {
    if (typeof input !== 'number' || Number.isInteger(input) || input < 0) {
      throw new Error('amount should be non-negative integer');
    }
    return true; 
  })
]