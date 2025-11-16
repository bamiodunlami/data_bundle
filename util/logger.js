import { createLogger, transports, format } from 'winston';
const { combine, json, timestamp, prettyPrint } = format;

const logger = createLogger({
  format: combine(json(), timestamp(), prettyPrint()),
});

if (process.env.NODE_ENV === 'production') {
  console.log('production');
  // logger.add(new transports.File({ filename: './logs/error.log', level: 'warn' }));
  logger.add(new transports.Console({ level: 'info' }));
} else {
  logger.add(new transports.Console({ level: 'info' }));
}

export default logger;
