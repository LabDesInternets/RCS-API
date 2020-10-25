const mongoose = require('mongoose');

const { Schema } = mongoose;

const articleSchema = new Schema({
  slug: {
    type: String,
    required: true
  },
  picture: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  conclusion: {
    type: String
  },
  date: {
    type: Date,
    required: true
  }
}, { timestamps: true });


module.exports = mongoose.model('Article', articleSchema);
