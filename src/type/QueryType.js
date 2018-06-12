import { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLID } from 'graphql';
import { connectionArgs } from 'graphql-relay';
import BookType from './BookType';
import { BookLoader } from '../loader';
import { NodeField } from '../interface/NodeInterface';
import BookConnection from '../connection/BookConnection';

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
    books: {
      type: BookConnection.connectionType,
      args: {
        ...connectionArgs,
        category: {
          type: GraphQLString,
        },
      },
      resolve: (root, args, context) => BookLoader.loadByCategory(context, args),
    },
    node: NodeField,
  }),
});
