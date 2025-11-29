import Joi from 'joi';
import { appError } from '#root/util/errorHandler.js';

export const validateSignup = async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(4).max(30).required().trim(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6),
    confirmPassword: Joi.ref('password'),
  });
  const { error } = await schema.validate(req.body, { abortEarly: false });
  if (error) throw new appError(400, error);
  next();
};

export const validateLogin = async (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  const { error } = await schema.validate(req.body, { abortEarly: false });
  if (error) throw new appError(400, error);
  next();
};

export const validateResetPassword = async (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
  });
  const { error } = await schema.validate(req.body);
  if (error) throw new appError(400, error);
  next();
};

export const validateChangePassword = async (req, res, next) => {
  const schema = Joi.object({
    password: Joi.string().min(6).required(),
    token: Joi.string().required(),
  });
  const { error } = await schema.validate(req.body);
  if (error) throw new appError(400, error);
  next();
};
