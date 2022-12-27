const express = require('express');
const error = require('../middleware/error');

const books = require('../routes/books');
const reviews = require('../routes/reviews');

module.exports = function (app) {
  app.use(express.json());
  app.use('/books', books);
  app.use('/reviews', reviews);

  app.use(error);
};
