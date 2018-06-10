// eslint-disable-next-line import/no-extraneous-dependencies
const NodeEnvironment = require('jest-environment-node');
// eslint-disable-next-line import/no-extraneous-dependencies
const MongodbMemoryServer = require('mongodb-memory-server');

class MongoEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);
    // eslint-disable-next-line new-cap
    this.mongo = new MongodbMemoryServer.default({
      binary: {
        version: '3.6.5',
      },
    });
  }

  async setup() {
    await super.setup();

    this.global.MONGO_URI = await this.mongo.getConnectionString();
    this.global.MONGO_DBNAME = await this.mongo.getDbName();
  }

  async teardown() {
    await this.mongo.stop();
    await super.teardown();
  }

  runScript(script) {
    return super.runScript(script);
  }
}

module.exports = MongoEnvironment;
