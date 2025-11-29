import { appError } from '#util/errorHandler';
import { response, serviceResponse } from '#util/responder';
import { client, sender } from '#configs/mail-trap';
import { signEmailVerificationToken } from '#helpers/jwt.helper';
import pool from '#configs/postgres';

export const getUserService = async (user_id) => {
  try {
    const { rows } = await pool.query('SELECT * FROM user_table  WHERE user_id=$1', [user_id]);
    const { name, email, phone, phone_verified, email_verified } = rows[0];
    const data = {
      user: {
        user_id,
        name,
        email,
        phone,
        email_verified,
        phone_verified,
      },
    };
    return serviceResponse(200, true, '', data);
  } catch (err) {
    return new appError(500, err);
  }
};

export const updateUserService = async (user_id, payload) => {
  try {
    const { rows } = await pool.query('UPDATE user_table SET name=$1, updated_at=$2  WHERE user_id=$3', [payload.name, new Date().toJSON(), user_id]);
    if (!rows.length) serviceResponse(400, false, 'Try again', {});
    return serviceResponse(200, true, 'User updated', {});
  } catch (err) {
    return new appError(500, err);
  }
};

export const verifyEmailService = async (user_id, host) => {
  try {
    const { rows } = await pool.query('SELECT name, email FROM user_table WHERE user_id=$1', [user_id]);
    const { name, email } = rows[0];
    const token = await signEmailVerificationToken({ user_id: user_id });
    const resetLink = `${host}/verify-email?tok=${token}`;

    const sendEmail = await client.send({
      from: sender,
      to: [{ email }],
      reply_to: {
        email: 'no-reply@smeair.com',
        name: 'no reply',
      },
      template_uuid: '40e969b9-933d-4d57-8c80-f5b54c279490',
      template_variables: {
        name: name,
        link: process.env.NODE_ENV !== 'production' ? `http://${resetLink}` : `https://${resetLink}`,
      },
    });
    if (!sendEmail.success) return serviceResponse(400, false, 'Error, try again', {});
    return serviceResponse(200, true, 'Email sent', {});
  } catch (err) {
    throw new appError(500, err);
  }
};
