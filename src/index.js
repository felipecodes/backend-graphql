const dotenv = require('dotenv').config();
if (dotenv.error) throw dotenv.error;

const debug = require('debug')('backend-graphql');
debug('logging with debug enabled');

import 'babel-polyfill';
import { createServer } from 'http';
import connectDatabase from './database';
import app from './app';

(async () => {
  try {
    debug(`connecting to database: ${process.env.MONGO_URI}`);
    const { host, port, name } = await connectDatabase();
    debug(`connected to database: ${host}:${port}/${name}`);
  } catch (error) {
    debug(error);
    process.exit(1);
  }

  createServer(app.callback())
    .listen(process.env.GRAPHQL_PORT, () =>
      debug(`server now listening at: ${process.env.GRAPHQL_PORT}`));
})();
