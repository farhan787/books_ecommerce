const { GetBooksWithReviewsSortedByRatings } = require('../services/Books');
const { NewErrorResp, NewResp } = require('../common/api');

const getBooks = async (req) => {
  let { limit, offset } = req.query;

  const options = { defaultLimit: 20 };
  if (limit) options.limit = parseInt(limit);
  if (offset) options.offset = parseInt(offset);

  const books = await GetBooksWithReviewsSortedByRatings(options);

  const data = { books };
  return { resp: NewResp(true, data), err: NewErrorResp() };
};

module.exports = { getBooks };
