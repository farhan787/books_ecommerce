const { GetBooksWithReviewsSortedByRatings } = require('../services/Books');

const getBooks = async (req) => {
  let { limit, offset } = req.query;

  const options = { defaultLimit: 20 };
  if (limit) options.limit = parseInt(limit);
  if (offset) options.offset = parseInt(offset);

  const books = await GetBooksWithReviewsSortedByRatings(options);
  const resp = { books };
  return { resp, err: null };
};

module.exports = { getBooks };
