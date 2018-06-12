import { nodeDefinitions, fromGlobalId } from 'graphql-relay';

import Book from '../loader/BookLoader';
import BookType from '../type/BookType';
import { BookLoader } from '../loader';

const { nodeField, nodeInterface } = nodeDefinitions(
  // eslint-disable-next-line consistent-return
  async (globalId, context) => {
    const { id, type } = fromGlobalId(globalId);

    if (type === 'Book') {
      const book = await BookLoader.load(context, id);
      return book;
    }
  },
  // eslint-disable-next-line consistent-return
  (obj) => {
    if (obj instanceof Book) {
      return BookType;
    }
  },
);

export const NodeField = nodeField;

export const NodeInterface = nodeInterface;
