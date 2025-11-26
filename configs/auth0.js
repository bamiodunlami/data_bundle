import { auth } from 'express-openid-connect';

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_SECRET,
  baseURL: process.env.AUTH0_BASE_URL,
  clientID: process.env.AUTH0_CLIENTID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
  //   clientSecret: process.env.AUTH0_SECRET,
  routes: {
    callback: '/api/v1/auth/callback',
  },
  //   authorizationParams: {
  //     response_mode: 'query', // <--- forces GET
  //     // response_type: 'code',
  //   },
};

export const auth0 = auth(config);
