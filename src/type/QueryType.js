import { GraphQLObjectType, GraphQLNonNull, GraphQLID } from 'graphql';
import BookType from './BookType';
import { BookLoader } from '../loader';

export default new GraphQLObjectType({
  name: 'Query',
  description: 'The root of all... queries',
  fields: () => ({
    book: {
      type: BookType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve: (root, { id }, context) => BookLoader.load(context, id),
    },
  }),
});
