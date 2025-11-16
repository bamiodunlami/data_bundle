import crypto from 'crypto';
export const createHash = (data) => {
  return crypto.createHash('SHA256').update(data).digest('hex');
};