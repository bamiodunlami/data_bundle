import { appError } from '#util/errorHandler';
import jwt from 'jsonwebtoken';

export const signToken = async (data) => {
  try {
    const signed = await jwt.sign(data, process.env.JWT_SECRET, {
      expiresIn: 60 * 60,
    });
    return signed;
  } catch (err) {
    throw new appError(501, err);
  }
};
