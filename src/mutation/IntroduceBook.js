import { GraphQLNonNull, GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { Book } from '../model';
import { BookLoader } from '../loader';
import BookType from '../type/BookType';

export default mutationWithClientMutationId({
  name: 'IntroduceBook',
  inputFields: {
    title: {
      type: new GraphQLNonNull(GraphQLString),
    },
    description: {
      type: new GraphQLNonNull(GraphQLString),
    },
    author: {
      type: new GraphQLNonNull(GraphQLString),
    },
    isbn: {
      type: new GraphQLNonNull(GraphQLString),
    },
    category: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  outputFields: {
    book: {
      type: BookType,
      resolve: ({ _id }, some, context) => BookLoader.load(context, _id),
    },
    error: {
      type: GraphQLString,
      resolve: ({ error }) => error,
    },
  },
  mutateAndGetPayload: async (input) => {
    let book = await Book.findOne({ isbn: input.isbn });
    if (book) {
      return {
        book: null,
        error: 'ISBN_ALREADY_REGISTRED',
      };
    }

    book = new Book(input);
    await book.save();
    return book;
  },
});
