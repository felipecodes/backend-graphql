import Koa from 'koa';
import Router from 'koa-router';
import graphqlHTTP from 'koa-graphql';
import cors from 'kcors';
import * as loaders from './loader';
import schema from './schema';

const app = new Koa();
const router = new Router();

router
  .all('/graphql', graphqlHTTP(async () => {
    // create the all dataloaders instances in each request
    const dataloaders = Object.keys(loaders).reduce(
      (accumulator, current) => ({
        ...accumulator,
        [current]: loaders[current].createLoader(),
      }),
      {},
    );

    return {
      schema,
      graphiql: process.env.NODE_ENV !== 'production',
      context: {
        dataloaders,
      },
    };
  }));

app
  .use(cors())
  .use(router.routes())
  .use(router.allowedMethods());

export default app;
