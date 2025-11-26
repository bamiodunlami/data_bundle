import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from '#configs/ratelimit';
import cors from 'cors';
import hpp from 'hpp';
import cookieParser from 'cookie-parser';
import { globalErrorHandler } from '#util/errorHandler';
import  '#util/logger';

import v1Router from '#routers/v1.routers'; //version 1 router

const app = express();

app.set('trust proxy', 1);

//security layer
app.use(helmet());
app.use(
  cors({
    origin: ['https://localhost:3000', process.env.URL],
  })
);

app.use(morgan('tiny'));
app.use(rateLimit(parseInt(process.env.GEN_LIMIT_TIME), parseInt(process.env.GEN_LIMIT))); //rate limit
app.use(express.json()); //body parser
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(hpp());


//router
app.use('/api/v1', v1Router); //v1 router

app.get('/callback', (req, res)=>{
  console.log(req)
})

//helath check
app.get('/', (req, res) => {
  // console.log(req.host)
  res.status(200).json({ status: 'ok' });
});

app.get('/slow', (req, res) => {
  setTimeout(() => {
    if (!req.timedout) res.json({ message: 'Completed' });
  }, 20000);
});

//error login
app.use(globalErrorHandler);

process.on('uncaughtException', (err) => {
  console.log('Uncaught Exception', err);
  process.exit(1);
});

process.on('unhandledRejection', (err) => {
  console.log('Unhandled Rejection', err);
  process.exit(1);
});

//404
app.use((req, res) => {
  return res.status(404).send({
    success: false,
    message: 'Not found',
  });
});

export default app;
