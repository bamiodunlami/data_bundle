import bcrypt from 'bcrypt';
import { appError } from '#util/errorHandler';

export const hashPassword = async (password) => {
  try {
    const hashed = await bcrypt.hash(password, parseInt(process.env.SALT_ROUND));
    return hashed;
  } catch (err) {
    throw new appError(500, err);
  }
};

export const confirmPassword = async (candidatePassword, hashedPassword) => {
  try {
    const compare = await bcrypt.compare(candidatePassword, hashedPassword);
    return compare;
  } catch (err) {
    throw new appError(500, err);
  }
};


