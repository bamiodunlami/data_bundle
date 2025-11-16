import 'dotenv/config'

import app from '#root/app.js';
import '#configs/postgres';
import http from 'http';


const port = process.env.PORT || 3000;
const server = http.createServer(app);

server.requestTimeout = 1500;
server.headersTimeout = 10000;

server.listen(port, () => {
  console.log('server running on port ', port);
});
