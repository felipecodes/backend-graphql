// @flow

const debug = require('debug')('backend-graphql:dataloader');

import DataLoader from 'dataloader';
import { mongooseLoader } from '@entria/graphql-mongoose-loader';
import { Book as BookModel } from '../model';
import type { GraphQLContext } from '../TypeDefinition';

type BookType = {
  _id: string,
  title: string,
  description: string,
  author: boolean
}

export default class Book {
  _id: string;
  title: string;
  description: string;
  author: boolean;

  constructor(data: BookType) {
    // eslint-disable-next-line no-underscore-dangle
    this._id = data._id;
    this.title = data.title;
    this.description = data.description;
    this.author = data.author;
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