import { graphql } from 'graphql';

import {
  getContext,
  connectDatabase,
  removeAllDocuments,
  disconnectDatabase,
  createBook,
} from '../../test/helpers';
import schema from '../../schema';
import fixture from './fixture.json';

beforeAll(connectDatabase);

beforeEach(removeAllDocuments);

afterAll(disconnectDatabase);

describe('Mutation IntroduceBook', () => {
  it('should not create with an existing isbn', async () => {
    await createBook(fixture.book);

    const query = `
      mutation IntroduceBook($input: IntroduceBookInput!)  {
        IntroduceBook(input: $input) {
          book {
            title
            author
            isbn
          }
          error
          clientMutationId
        }
      }
    `;

    const rootValue = {};
    const variables = {
      input: {
        ...fixture.book,
        clientMutationId: fixture.clientMutationId,
      },
    };

    const context = getContext();
    const result = await graphql(schema, query, rootValue, context, variables);
    const { book, error, clientMutationId } = result.data.IntroduceBook;

    expect(book).toEqual(null);
    expect(clientMutationId).toEqual(fixture.clientMutationId);
    expect(error).toEqual('ISBN_ALREADY_REGISTRED');
  });

  it('should create a new book when parameters are valid', async () => {
    const query = `
      mutation IntroduceBook($input: IntroduceBookInput!)  {
        IntroduceBook(input: $input) {
          book {
            title
            author
            isbn
          }
          error
          clientMutationId
        }
      }
    `;

    const rootValue = {};
    const variables = {
      input: {
        ...fixture.book,
        clientMutationId: fixture.clientMutationId,
      },
    };

    const context = getContext();
    const result = await graphql(schema, query, rootValue, context, variables);
    const { book, error, clientMutationId } = result.data.IntroduceBook;

    expect(book.title).toEqual(fixture.book.title);
    expect(book.author).toEqual(fixture.book.author);
    expect(book.isbn).toEqual(fixture.book.isbn);
    expect(error).toEqual(null);
    expect(clientMutationId).toEqual(fixture.clientMutationId);
  });
});
