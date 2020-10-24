const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const Article = require('./src/models/article');

const server = express();


server.use(bodyParser.json());


server.use('/api', graphqlHTTP({
  schema: buildSchema(`
    type Article {
      _id: ID!
      slug: String!
      picture: String!
      title: String!
      description: String!
      text: String!
      conclusion: String
      date: String!
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

    type RootQuery {
      articles: [Article!]!
    }

    type RootMutation {
      createArticle(articleInput: ArticleInput): Article
    }

    schema {
      query: RootQuery
      mutation: RootMutation
    }
  `),
  rootValue: {
    articles: () => Article.find()
      .then((articles) => articles.map((article) => ({ ...article._doc })))
      .catch((err) => {
        throw err;
      }),
    createArticle: (args) => {
      const article = new Article({
        slug: args.articleInput.slug,
        picture: args.articleInput.picture,
        title: args.articleInput.title,
        description: args.articleInput.description,
        text: args.articleInput.text,
        conclusion: args.articleInput.conclusion,
        date: new Date(args.articleInput.date)
      });
      return article.save()
        .then((result) => {
          console.log(result);
          return { ...result._doc };
        })
        .catch((err) => {
          console.log(err);
          throw err;
        });
    }
  },
  graphiql: true
}));


module.exports = server;
