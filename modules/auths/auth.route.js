import express from 'express';
import rateLimit from '#configs/ratelimit';
import { signup, login } from './auth.controller.js';
import { verifyInput } from '#middlewares/verifyInput.middleware';
import { validateSignup } from './auth.middleware.js';
import { validateLogin } from './auth.middleware.js';
const authRoute = express.Router();

authRoute.post('/signup', rateLimit(parseInt(process.env.SIGNUP_LIMIT_TIME), parseInt(process.env.AUTH_LIMIT)), verifyInput('name', 'email', 'password', 'confirmPassword'), validateSignup, signup);
authRoute.post('/login', rateLimit(parseInt(process.env.LOGIN_LIMIT_TIME), parseInt(process.env.AUTH_LIMIT)), verifyInput('email', 'password'), validateLogin, login);

export default authRoute;
