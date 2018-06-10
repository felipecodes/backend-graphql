// @flow

import mongoose from 'mongoose';
import * as loaders from '../../loader';
import { Book } from '../../model';

export const createBook = async (payload: Book) => {
  if (typeof payload !== 'object' || payload === null) {
    throw new Error('payload of createBook should be a object');
  }

  return new Book(payload).save();
};

export const connectDatabase = async () => {
  mongoose.Promise = Promise;
  return mongoose.connect(global.MONGO_URI, {
    autoIndex: false,
    autoReconnect: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000,
    connectTimeoutMS: 10000,
    dbName: global.MONGO_DBNAME,
  });
};

export const removeAllDocuments = async () => {
  await mongoose.connection.db.dropDatabase();
};

export const disconnectDatabase = async () => mongoose.disconnect();

export const getContext = () => ({
  dataloaders: Object.keys(loaders).reduce(
    (accumulator, current) => ({
      ...accumulator,
      [current]: loaders[current].createLoader(),
    }),
    {},
  ),
});
