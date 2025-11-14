import pool from '#configs/postgres';
import { serviceResponse } from '#util/responder';
import { appError } from '#util/errorHandler';
import { hashPassword, confirmPassword } from '#helpers/passwor.helper';
import { signAccessToken } from '#helpers/jwt.helper';
import { signRefreshToken } from '#helpers/jwt.helper';

export const signupService = async (payload) => {
  const { name, email, password } = payload;
  // hash password
  const newPassword = await hashPassword(password);
  //start transaction
  const queryText = 'INSERT INTO user_table (name, email, password) VALUES ($1, $2, $3) RETURNING user_id, name, email';
  const value = [name, email, newPassword];
  try {
    const saveUser = await pool.query(queryText, value);
    const user = saveUser.rows[0];
    //sign token
    const accessToken = await signAccessToken({ id: user.user_id });
    const refreshToken = await signRefreshToken({ id: user.user_id });

    //save refresh token
    const refreshQuery = 'INSERT INTO session_table (user_id, session, status) VALUES ($1, $2, $3)';
    const refreshValue = [user.user_id, refreshToken, true];
    const saveSession = await pool.query(refreshQuery, refreshValue);
    // console.log(saveSession.rows[0]);

    //send cookie
    return serviceResponse(201, true, 'User created', {
      accessToken: accessToken,
      refreshToken: refreshToken,
      user_id: user.user_id,
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    if (err.code === '23505') {
      throw new appError(409, err, err.code);
    }
    throw new appError(501, err);
  }
};

export const loginService = async (payload) => {
  const { email } = payload;
  //find user
  const queryText = 'SELECT * FROM user_table WHERE email = $1 ';
  const value = [email];
  try {
    const query = await pool.query(queryText, value);
    if (!query.rows.length) return serviceResponse(400, false, 'Incorrect Credeitials', {});
    const user = query.rows[0];
    //confirm password
    const { user_id, email, name, password } = user;
    const isPassword = await confirmPassword(payload.password, password);
    if (!isPassword) return serviceResponse(400, false, 'Incorrect Credentials', {});

    //save last login
    const date = new Date();
    const dateString = date.toJSON();
    const llText = 'UPDATE user_table SET last_login=$1 WHERE email = $2';
    const llValue = [dateString, email];
    const ll = await pool.query(llText, llValue);

    //sign token
    const accessToken = await signAccessToken({ user_id: user_id });
    const refreshToken = await signRefreshToken({ user_id: user_id });

    //update refresh token
    const refreshQuery = 'UPDATE session_table SET session=$1 WHERE user_id = $2';
    const refreshValue = [refreshToken, user_id];
    const updateSessoin = await pool.query(refreshQuery, refreshValue);

    //send
    return serviceResponse(200, true, '', {
      user_id,
      email,
      name,
      accessToken,
      refreshToken,
    });
  } catch (e) {
    throw new appError(500, e);
  }
};