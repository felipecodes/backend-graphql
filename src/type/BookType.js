import { GraphQLObjectType, GraphQLString } from 'graphql';

const BookType = new GraphQLObjectType({
  name: 'Book',
  description: 'Book data',
  fields: () => ({
    _id: {
      type: GraphQLString,
      // eslint-disable-next-line no-underscore-dangle
      resolve: book => book._id,
    },
    title: {
      type: GraphQLString,
      resolve: book => book.title,
    },
    description: {
      type: GraphQLString,
      resolve: book => book.description,
    },
    author: {
      type: GraphQLString,
      resolve: book => book.author,
    },
    isbn: {
      type: GraphQLString,
      resolve: book => book.isbn,
    },
  }),
});

export default BookType;
