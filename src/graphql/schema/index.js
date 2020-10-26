const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type Article {
      _id: ID!
      slug: String!
      picture: String!
      title: String!
      description: String!
      text: String!
      conclusion: String
      date: String!
      createdAt: String!
      updatedAt: String!
    }

    type User {
      _id: ID!
      email: String!
      password: String
    }

    type AuthData {
      userId: ID!
      token: String!
      tokenExpiration: Int!
    }

    input ArticleInput {
      slug: String!
      picture: String!
      title: String!
      description: String!
      text: String!
      conclusion: String
      date: String!
    }

    input UserInput {
      email: String!
      password: String!
    }

    type RootQuery {
      articles: [Article!]!
      login(email: String!, password: String!): AuthData!
    }

    type RootMutation {
      createArticle(articleInput: ArticleInput): Article
      createUser(userInput: UserInput) : User
    }

    schema {
      query: RootQuery
      mutation: RootMutation
    }
  `);
