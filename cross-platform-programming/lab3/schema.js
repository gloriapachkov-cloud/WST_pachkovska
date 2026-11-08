export const typeDefs = `#graphql
  type User { id: ID! name: String! email: String! }
  type Service {
    id: ID!
    name: String!
    description: String!
    price: Float!
    duration: Int!
    category: String!
    owner: User!
  }
  type AuthPayload { token: String! user: User! }
  type Query {
    users: [User!]!
    me: User
    services: [Service!]!
    service(id: ID!): Service
  }
  type Mutation {
    register(name: String!, email: String!, password: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    createService(name: String!, description: String!, price: Float!, duration: Int!, category: String!): Service!
    deleteService(id: ID!): Boolean!
  }
`;
