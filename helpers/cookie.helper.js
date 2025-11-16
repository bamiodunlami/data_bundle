export const accessCookie = (res, token) => {
  return res.cookie('accessToken', token, {
    maxAge: parseInt(process.env.ACCESS_TOKEN_TIME) * 60 * 1000, // in hour
    secure: process.env.NODE_ENV === 'production' ? true : false,
    httpOnly: true,
    sameSite: true,
  });
};

export const refreshCookie = (res, token) => {
  return res.cookie('refreshToken', token, {
    maxAge: parseInt(process.env.REFRESH_TOKEN_TIME) * 24 * 60 * 60 * 1000, // in days
    secure: process.env.NODE_ENV === 'production' ? true : false,
    httpOnly: true,
    sameSite: true,
  });
};
