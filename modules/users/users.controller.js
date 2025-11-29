import { asyncHandler } from '#util/errorHandler';
import { response } from '#util/responder';
import { getUserService, updateUserService, verifyEmailService } from './users.service.js';


export const getUser = asyncHandler(async (req, res) => {
  const data = await getUserService(req.user);
  return response(res, data.statusCode, data.success, data.message, data.data);
});

export const updateUserName = asyncHandler(async (req, res) => {
  const data = await updateUserService(req.user, req.body);
  return response(res, data.statusCode, data.success, data.message, data.data);
});

export const verifyEmail = asyncHandler(async (req, res) => {
  const data = await verifyEmailService(req.user);
  return response(res, data.statusCode, data.success, data.message, data.data);
});
