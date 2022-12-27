const { AddBookReview } = require('../services/BooksReviews');

const addBookReview = (reqData) => {
  // TODO: add validation and other business logic
  //   const { bookId, comment, review } = reqData;
  const err = AddBookReview();
  if (err) {
    // handle here
    return {
      err,
      success: false,
    };
  }

  return {
    err,
    success: true,
  };
};

module.exports = { addBookReview };
