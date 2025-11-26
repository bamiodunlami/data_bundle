import express from 'express';
import rateLimit from '#configs/ratelimit';
import { signup, login, resetPassword, verifyResetToken, changePassword, refreshToken} from './auth.controller.js';
import { verifyInput } from '#middlewares/verifyInput.middleware';
import { validateSignup, validateLogin, validateResetPassword, validateParams, validateChangePassword } from './auth.middleware.js';

const authRoute = express.Router();

authRoute.post('/signup', rateLimit(parseInt(process.env.SIGNUP_LIMIT_TIME), parseInt(process.env.AUTH_LIMIT)), verifyInput('name', 'email', 'password', 'confirmPassword'), validateSignup, signup);
authRoute.post('/login', rateLimit(parseInt(process.env.LOGIN_LIMIT_TIME), parseInt(process.env.AUTH_LIMIT)), verifyInput('email', 'password'), validateLogin, login);
authRoute.post('/reset-password', rateLimit(parseInt(process.env.SIGNUP_LIMIT_TIME), parseInt(process.env.AUTH_LIMIT)), verifyInput('email'), validateResetPassword, resetPassword);
authRoute.get('/verify-reset-password', rateLimit(process.env.LOGIN_LIMIT_TIME, process.env.AUTH_LIMIT), validateParams, verifyResetToken);
authRoute.post('/change-password', rateLimit(process.env.LOGIN_LIMIT_TIME, process.env.AUTH_LIMIT), verifyInput('password', 'token'), validateChangePassword, changePassword);
authRoute.get('/refresh-token', rateLimit(process.env.LOGIN_LIMIT_TIME, process.env.AUTH_LIMIT), refreshToken);


export default authRoute;
