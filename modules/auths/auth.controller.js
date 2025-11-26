import { asyncHandler } from '#util/errorHandler';
import { signupService, loginService, resetPasswordService, verifyResetTokenService, changePasswordService, refreshTokenService } from './auth.service.js';
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

export const changePassword = asyncHandler(async (req, res) => {
  const data = await changePasswordService(req.body);
  return response(res, data.statusCode, data.success, data.message);
});

export const refreshToken = asyncHandler(async (req, res) => {
  const payload = req.cookies?.refreshToken;
  const data = await refreshTokenService(payload);
  const { accessToken, refreshToken, user_id, name, email } = data.data;
  // console.log(accessToken, '\n', refreshToken)
  accessCookie(res, accessToken);
  refreshCookie(res, refreshToken);
  return response(res, data.statusCode, data.success, data.message);
});

// auth0
// export const auth0Home = asyncHandler(async (req, res) => {
//   console.log(req.oidc.isAuthenticated())
//   res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
// });

// export const auth0CallBack = asyncHandler(async (req, res) => {
//   console.log(JSON.stringify(req.oidc.user))
//   res.send(JSON.stringify(req.oidc.user));
// });
