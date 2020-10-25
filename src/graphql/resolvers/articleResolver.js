const Article = require('../../models/article');
const { dateToString } = require('../../helpers/date');

const transformArticle = (article) => ({
  ...article._doc,
  date: dateToString(article._doc.date),
  createdAt: dateToString(article._doc.createdAt),
  updatedAt: dateToString(article._doc.updatedAt)
});

module.exports = {
  articles: async () => {
    try {
      const articles = await Article.find();
      return articles.map((article) => transformArticle(article));
    } catch (err) {
      throw err;
    }
  },
  createArticle: async (args) => {
    const article = new Article({
      slug: args.articleInput.slug,
      picture: args.articleInput.picture,
      title: args.articleInput.title,
      description: args.articleInput.description,
      text: args.articleInput.text,
      conclusion: args.articleInput.conclusion,
      date: dateToString(args.articleInput.date)
    });
    let createdArticle;
    try {
      const result = await article.save();
      createdArticle = transformArticle(result);
      return createdArticle;
    } catch (err) {
      throw err;
    }
  }
};
