const express = require('express');
const error = require('../middleware/error');

const booksRoutesHandler = require('../routes/books');
const reviewsRoutesHandler = require('../routes/reviews');

module.exports = function (app) {
  app.use(express.json());
  app.use('/books', booksRoutesHandler);
  app.use('/reviews', reviewsRoutesHandler);

  app.use(error);
};
