import { asyncHandler } from '#util/errorHandler';
import { signupService, loginService, resetPasswordService, verifyResetTokenService } from './auth.service.js';
import { response } from '#util/responder';
import { accessCookie, refreshCookie } from '#helpers/cookie.helper';

export const signup = asyncHandler(async (req, res) => {
  const data = await signupService(req.body);
  const { accessToken, refreshToken, user_id, name, email } = data.data;
  //send email verification mail
  //accessToken & refreshToken
  accessCookie(res, accessToken);
  refreshCookie(res, refreshToken);

  return response(res, data.statusCode, data.success, data.message, {
    user_id,
    name,
    email,
  });
});

export const login = asyncHandler(async (req, res) => {
  const data = await loginService(req.body);

  accessCookie(res, data.data.accessToken);
  refreshCookie(res, data.data.refreshToken);

  return response(res, data.statusCode, data.success, data.message, {
    user_id: data.data.user_id,
    name: data.data.name,
    email: data.data.email,
  });
});

export const resetPassword = asyncHandler(async (req, res) => {
  const data = await resetPasswordService(req.body, req.host);
  return response(res, data.statusCode, data.success, data.message, data.data);
});

export const verifyResetToken = asyncHandler(async (req, res) => {
  const data = await verifyResetTokenService(req.query.auth);
  return response(res, data.statusCode, data.success, data.message, data.data);
});
