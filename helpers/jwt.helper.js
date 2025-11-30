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

export const signResetPasswordToken = async (data) => {
  try {
    const token = jwt.sign(data, process.env.JWT_RESET_PASSWORD_SECRET, {
      expiresIn: process.env.SHOT_TOKEN_TIME * 60, //in minutes
    });
    return token;
  } catch (err) {
    throw new appError(500, err);
  }
};

export const signEmailVerificationToken = async (data) => {
  try {
    const token = await jwt.sign(data, process.env.JWT_EMAIL_VERIFICATION, {
      expiresIn: parseInt(process.env.SHOT_TOKEN_TIME) * 60,
    });
    return token;
  } catch (err) {
    throw new appError(500, err);
  }
};

// const compare accessToken
export const confirmAcessToken = async (data) => {
  try {
    const token = await jwt.verify(data, process.env.JWT_ACCESS_SECRET);
    return token;
  } catch (err) {
    throw new appError(400, err);
  }
};

// const compare refreshToken
export const confirmRefreshToken = async (data) => {
  try {
    const token = await jwt.verify(data, process.env.JWT_REFRESH_SERCRET);
    return token;
  } catch (err) {
    throw new appError(400, err);
  }
};

// const compare refreshToken
export const confirmResetPasswordToken = async (data) => {
  try {
    return await jwt.verify(data, process.env.JWT_RESET_PASSWORD_SECRET);
  } catch (err) {
    throw new appError(400, err);
  }
};

export const confirmEmailVerification = async (data) => {
  try {
    const token = await jwt.verify(data, process.env.JWT_EMAIL_VERIFICATION);
    return token;
  } catch (err) {
    throw new appError(400, err);
  }
};
