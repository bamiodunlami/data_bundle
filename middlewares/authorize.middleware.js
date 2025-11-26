import { confirmAcessToken } from '#helpers/jwt.helper';
import { response } from '#util/responder';
import pool from '#configs/postgres';
import { appError } from '#root/util/errorHandler.js';

export const authorize = async (req, res, next) => {
  const accessToken = req.cookies?.accessToken;
  if (!accessToken) {
    return response(res, 401, false, 'No access token, send refresh token', {});
  }

  const token = await confirmAcessToken(accessToken);
  const { user_id, iat } = token;

  try {
    const { rows } = await pool.query('SELECT user_id, name, email, password_changed_at  FROM user_table WHERE user_id=$1', [user_id]);

    if (!rows.length || iat < rows[0].password_changed_at.getTime() / 1000) {
      return response(res, 400, false, 'Kindly login');
    }

    req.user = rows[0];
    next();
  } catch (err) {
    return new appError(400, err);
  }
};
