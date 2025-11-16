import express from 'express';
import rateLimit from '#configs/ratelimit';
import { validateParams } from './auth.middleware.js';
import { signup, login, resetPassword, verifyResetToken } from './auth.controller.js';
import { verifyInput } from '#middlewares/verifyInput.middleware';
import { validateSignup, validateLogin, validateResetPassword } from './auth.middleware.js';
const authRoute = express.Router();

authRoute.post('/signup', rateLimit(parseInt(process.env.SIGNUP_LIMIT_TIME), parseInt(process.env.AUTH_LIMIT)), verifyInput('name', 'email', 'password', 'confirmPassword'), validateSignup, signup);
authRoute.post('/login', rateLimit(parseInt(process.env.LOGIN_LIMIT_TIME), parseInt(process.env.AUTH_LIMIT)), verifyInput('email', 'password'), validateLogin, login);
authRoute.post('/reset-password', rateLimit(parseInt(process.env.SIGNUP_LIMIT_TIME), parseInt(process.env.AUTH_LIMIT)), verifyInput('email'), validateResetPassword, resetPassword);
authRoute.get('/verify-reset-password', rateLimit(process.env.LOGIN_LIMIT_TIME, process.env.AUTH_LIMIT), validateParams, verifyResetToken);

export default authRoute;
