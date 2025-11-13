import { appError } from '#util/errorHandler';
import jwt from 'jsonwebtoken';

export const signAccessToken = async (data) => {
  try {
    const signed = await jwt.sign(data, process.env.JWT_ACCESS_SECRET, {
      expiresIn: parseInt(process.env.ACCESS_TOKEN_TIME) * 60, //in minute
    });
    return signed;
  } catch (err) {
    throw new appError(501, err);
  }
};

export const signRefreshToken = async (data) => {
  try {
    const token = await jwt.sign(data, process.env.JWT_REFRESH_SERCRET, {
      expiresIn: parseInt(process.env.REFRESH_TOKEN_TIME) * 24 * 60 * 60, // in days
    });
    return token;
  } catch (err) {
    throw new appError(501, err);
  }
};
