# GraphQL Server

## Setup

### Downloading the code by cloning the repository:

```bash
git clone git@github.com:thefelpes/backend-graphql.git
```

### Instalation

1. **Install Node.js**: See [the nvm documentation](https://github.com/creationix/nvm) for instructions on installing it with your OS.
2. **Install MongoDB**: See [the MongoDB documentation](https://docs.mongodb.com/manual/installation/) for instructions on installing it with your OS.

Once you have Node.js and MongoDB installed locally, ensure that your Node.js version is `8.11.2`, and your npm is up-to-date.

```bash
nvm use
```

```bash
npm install npm -g
```

Install the JavaScript dependencies:

```bash
npm install
```

### Running the app

Whenever you want to run locally you have to have MongoDB running in the background. Example from mongodb documentation: [Runnig mongodb on ubuntu](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/#start-mongodb).

#### Starting the server

Whenever you want to run in **production mode** you have to have **build the app** and to after **run the app**:

```bash
yarn build
```

```bash
yarn start
```

Whenever you want to run in **development mode**:

```bash
yarn dev
```
