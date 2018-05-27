import { createServer } from 'http';
import { config } from 'dotenv';
import app from './app';

// load the .env variables
config();

const server = createServer(app.callback());

server.listen(process.env.GRAPHQL_PORT, () =>
  // eslint-disable-next-line no-console
  console.log(`Server now listening at: ${process.env.GRAPHQL_PORT}`));
