import { graphql } from 'graphql';

import {
  getContext,
  connectDatabase,
  removeAllDocuments,
  disconnectDatabase,
} from '../../test/helpers';
import schema from '../../schema';
import fixture from './fixture.json';

beforeAll(connectDatabase);

beforeEach(removeAllDocuments);

afterAll(disconnectDatabase);

describe('Mutation IntroduceBook', () => {
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
    const variables = { input: fixture };
    const context = getContext();

    const result = await graphql(schema, query, rootValue, context, variables);
    const { book, error, clientMutationId } = result.data.IntroduceBook;

    expect(book.title).toEqual(fixture.title);
    expect(book.author).toEqual(fixture.author);
    expect(book.isbn).toEqual(fixture.isbn);
    expect(error).toEqual(null);
    expect(clientMutationId).toEqual(fixture.clientMutationId);
  });
});
