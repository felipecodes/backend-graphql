import { GraphQLObjectType } from 'graphql';
import IntroduceBook from '../mutation/IntroduceBook';

export default new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    IntroduceBook,
  }),
});

