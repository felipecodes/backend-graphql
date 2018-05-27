import Koa from 'koa';
import Router from 'koa-router';
import graphqlHTTP from 'koa-graphql';
import logger from 'koa-logger';
import cors from 'kcors';
import schema from './schema';

const app = new Koa();
const router = new Router();

router
  .all('/graphql', graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV !== 'production',
  }));

app
  .use(logger())
  .use(cors())
  .use(router.routes())
  .use(router.allowedMethods());

export default app;
