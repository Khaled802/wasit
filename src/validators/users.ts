import { body } from "express-validator";
import { AuthABS } from "../models/interfaces/auth";
import { Auth } from "../models/auth";

export const authBodyValidators = [
  body('username').notEmpty().withMessage('username shouldn\'t be empty')
  .trim()
  .custom(async (username)=> {
    if (await Auth.is_username_found(username))
      throw new Error('the username is found');
    return true;
  }),
  body('email').notEmpty().withMessage('username shouldn\'t be empty')
  .trim()
  .normalizeEmail()
  .custom(async (email)=> {
    if (await Auth.is_email_found(email))
      throw new Error('the email is found');
    return true;
  }),
  body('password').isStrongPassword().withMessage('password should be strong')
]

export const singinValidators = [
  body('email').notEmpty().withMessage('username shouldn\'t be empty')
  .trim()
  .normalizeEmail()
  .custom(async (email)=> {
    if (!(await Auth.is_email_found(email)))
      throw new Error('the email is not found');
    return true;
  }),
  body('password').notEmpty().withMessage('password shouldn\'t be empty')
]