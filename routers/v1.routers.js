import express from 'express';
const v1Router = express.Router();


import authRouter from '#auths/auth.route';
import userRouter from '#users/user.route';

v1Router.use('/auth', authRouter);
v1Router.use('/user', userRouter);

export default v1Router;
