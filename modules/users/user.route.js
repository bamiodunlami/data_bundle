import express from 'express';
import rateLimit from '#configs/ratelimit';
import { validateParams, verifyInput, selectOnlyExpected } from '#middlewares/verifyInput.middleware';
import { authorize } from '#middlewares/authorize.middleware';
import { validateNameUpdate } from './user.middleware.js';
const userRouter = express.Router();

import { getUser, updateUserName, verifyEmail, confirmEmail } from './users.controller.js';
import limit from '#configs/ratelimit';

userRouter.get('/', rateLimit(5, 100), authorize, getUser);
userRouter.patch('/update-name', rateLimit(5, 3), authorize, validateNameUpdate, selectOnlyExpected('name'), updateUserName);
userRouter.get('/verify-email', limit(5, 3), authorize, verifyEmail);
userRouter.get('/confirm-email', limit(5, 3), validateParams, confirmEmail);

export default userRouter;
