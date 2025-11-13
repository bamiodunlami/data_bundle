import { asyncHandler } from '#util/errorHandler';
import { signupService, loginService } from './auth.service.js';
import { response } from '#util/responder';

export const signup = asyncHandler(async (req, res) => {
  const data = await signupService(req.body);
  const { token, user_id, name, email } = data.data;
  //send email verification mail
  res.cookie('accessToken', token, {
    maxAge: 60 * 60 * 1000, // 1 hour
    secure: process.env.NODE_ENV === 'production' ? true : false,
    httpOnly: true,
  });
  return response(res, data.statusCode, data.success, data.message, {
    user_id,
    name,
    email,
  });
});

export const login = asyncHandler(async (req, res) => {
  const data = await loginService(req.body);
  res.cookie('accessToken', data.data.token, {
    maxAge: parseInt(process.env.MAX_AGE) * 60 * 1000, // 1h
    secure: process.env.NODE_ENV === 'production' ? true : false,
    httpOnly: true,
  });
  return response(res, data.statusCode, data.success, data.message, {
    user_id: data.data.user_id,
    name: data.data.name,
    email: data.data.email,
  });
});
