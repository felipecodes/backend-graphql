// @flow

const debug = require('debug')('backend-graphql:dataloader');

import DataLoader from 'dataloader';
import { connectionFromMongoCursor, mongooseLoader } from '@entria/graphql-mongoose-loader';
import { Book as BookModel } from '../model';
import type { GraphQLContext } from '../TypeDefinition';

type BookType = {
  _id: string,
  title: string,
  description: string,
  author: string;
  isbn: string;
  category: string;
}

export default class Book {
  _id: string;
  title: string;
  description: string;
  author: string;
  isbn: string;
  category: string;

  constructor(data: BookType) {
    // eslint-disable-next-line no-underscore-dangle
    this._id = data._id;
    this.title = data.title;
    this.description = data.description;
    this.author = data.author;
    this.isbn = data.isbn;
    this.category = data.category;
  }
}

export const createLoader = () => new DataLoader(ids => mongooseLoader(BookModel, ids));

// eslint-disable-next-line no-unused-vars, arrow-body-style
const viewCanSee = (context, data) => {
  // Anyone can see another user
  return true;
};

export const load = async (context: GraphQLContext, id: string): Promise<?Book> => {
  if (!id) {
    return null;
  }

  let data;
  try {
    data = await context.dataloaders.BookLoader.load(id);
  } catch (error) {
    debug(error);
    return null;
  }
  return viewCanSee(context, data) ? new Book(data) : null;
};

export const loadByCategory = async (context, args) => {
  const query = args.category
    ? { category: { $regex: new RegExp(`${args.category}`) } }
    : {};

  const books = BookModel.find(query, { _id: 1 }).sort({ createdAt: -1 });

  return connectionFromMongoCursor({
    cursor: books,
    context,
    args,
    loader: load,
  });
};
