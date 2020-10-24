require('dotenv').config();
const mongoose = require('mongoose');
const logger = require('./src/helpers/logger');


const server = require('./server');

const port = process.env.PORT || 8000;
const env = process.env.NODE_ENV || 'development';


mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.g7j1f.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`)
  .then(() => {
    server.listen(port, () => {
      logger.info(`Server is listening on port ${port}`);
      logger.info(`Current environment is ${env}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
