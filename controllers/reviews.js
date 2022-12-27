const { AddBookReview } = require('../services/BooksReviews');
const { BookExistById } = require('../services/Books');

const validateAddBookReviewReqData = (reqData) => {
  const { bookId, comment, reviewStarsCount } = reqData;

  if (!bookId) {
    return 'Book id is required';
  }

  if (!comment || !comment.length) {
    return 'Comment is required';
  }

  if (!reviewStarsCount) {
    return 'Review stars count is required';
  }
  return null;
};

const addBookReview = async (reqData) => {
  const validationErr = validateAddBookReviewReqData(reqData);
  if (validationErr && validationErr.length) {
    return {
      err: { message: validationErr, respStatusCode: 401 },
    };
  }

  const { bookId, comment, reviewStarsCount } = reqData;
  const bookExist = await BookExistById(bookId);
  if (!bookExist) {
    return {
      err: { message: "Book doesn't exist", respStatusCode: 401 },
    };
  }

  let resp = { success: false };
  const insertionResult = await AddBookReview({
    bookId,
    comment,
    reviewStars: reviewStarsCount,
  });
  resp.success = insertionResult && insertionResult.affectedRows ? true : false;

  return { err: null, resp };
};

module.exports = { addBookReview };
