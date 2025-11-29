import Joi from 'joi';
import { appError } from '#util/errorHandler';

export const validateNameUpdate = async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(4).max(32),
  });
  const { error, value } = await schema.validate(req.body);
  if (error) {
    throw new appError(400, error);
  }
  next();
};
