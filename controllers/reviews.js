const { NewErrorResp, NewResp } = require('../common/api');
const { BAD_REQUEST } = require('../common/responseCodes');
const { INVALID_BOOK, MONITOR_LOGS } = require('../common/errorMessages');

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
    return { err: NewErrorResp(validationErr, BAD_REQUEST) };
  }

  const { bookId, comment, reviewStarsCount } = reqData;
  const bookExist = await BookExistById(bookId);
  if (!bookExist) {
    return { err: NewErrorResp(INVALID_BOOK, BAD_REQUEST) };
  }

  const insertionResult = await AddBookReview({
    bookId,
    comment,
    reviewStars: reviewStarsCount,
  });
  const recordCreated =
    insertionResult && insertionResult.affectedRows ? true : false;
  if (recordCreated) {
    return { resp: NewResp(recordCreated), err: NewErrorResp() };
  }

  return {
    resp: NewResp(recordCreated, null, MONITOR_LOGS),
    err: NewErrorResp(),
  };
};

module.exports = { addBookReview };
