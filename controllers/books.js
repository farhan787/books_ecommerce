const { FetchBooksByIDs } = require('../services/Books');

const getBooks = () => {
  // TODO: add validation and other business logic
  const books = FetchBooksByIDs();
  return {
    books: [{ title: 'book1' }],
  };
};

module.exports = { getBooks };
