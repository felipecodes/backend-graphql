const debug = require('debug')('backend-graphql:database');

import mongoose from 'mongoose';

const connectDatabase = () => (
  new Promise((resolve, reject) => {
    mongoose.connection
      .on('error', error => reject(error))
      .on('close', () => debug('Database connection closed.'))
      .on('open', () => resolve(mongoose.connections[0]));

    mongoose.connect(process.env.MONGO_URI, {
      bufferCommands: false,
      autoReconnect: true,
      autoIndex: false,
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 500,
      poolSize: 10,
      bufferMaxEntries: 0,
    });
  })
);

export default connectDatabase;
