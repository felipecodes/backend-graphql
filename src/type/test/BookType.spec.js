import { graphql } from 'graphql';
import {
  connectDatabase,
  disconnectDatabase,
  removeAllDocuments,
  createBook,
  getContext,
} from '../../test/helpers';
import schema from '../../schema';
import fixture from './fixture.json';

beforeAll(connectDatabase);

beforeEach(removeAllDocuments);

afterAll(disconnectDatabase);

describe('BookType', () => {
  it('should returns the book type', async () => {
    const { id } = await createBook(fixture);

    const query = `
      query Book($id: ID!) {
        book(id: $id) {
          title
          author
          description
          isbn
          category
        }
      }
    `;

    const rootValue = {};
    const variables = { id };
    const context = getContext();

    const result = await graphql(schema, query, rootValue, context, variables);
    const { book } = result.data;

    expect(book.title).toBe(fixture.title);
    expect(book.author).toBe(fixture.author);
    expect(book.description).toBe(fixture.description);
  });
});
