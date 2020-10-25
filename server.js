const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');

const graphQlSchema = require('./src/graphql/schema');
const graphQlResolvers = require('./src/graphql/resolvers');


const server = express();


server.use(bodyParser.json());


server.use('/api', graphqlHTTP({
  schema: graphQlSchema,
  rootValue: graphQlResolvers,
  graphiql: true
}));


module.exports = server;
