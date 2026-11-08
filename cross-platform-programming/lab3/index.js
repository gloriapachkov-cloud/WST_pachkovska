import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema.js';
import { resolvers } from './resolvers.js';
import { getUserFromAuthHeader } from './auth.js';

const server = new ApolloServer({ typeDefs, resolvers });
const { url } = await startStandaloneServer(server, {
  listen: { port: 4001 },
  context: async ({ req }) => ({ user: getUserFromAuthHeader(req.headers.authorization) }),
});
console.log(`GraphQL API RE:BELLE запущено за адресою: ${url}`);
