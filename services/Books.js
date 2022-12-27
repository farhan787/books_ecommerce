const _ = require('lodash');

const db = require('../startup/db');

const fetchBooksWithAverageRatings = async (limit, offset = 0) => {
  let booksWithAvgRatingsQuery = `
        SELECT b.id as book_id, floor(avg(br.star_rating)) as avg_rating
        FROM book_reviews br
        INNER JOIN books b 
        ON br.book_id = b.id
        GROUP BY b.id
        ORDER BY avg_rating DESC`;
  if (limit) booksWithAvgRatingsQuery += ' LIMIT ?';
  if (offset) booksWithAvgRatingsQuery += ' OFFSET ?';

  return new Promise((resolve, reject) => {
    db.query(
      { sql: booksWithAvgRatingsQuery, values: [limit, offset * limit] },
      (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      }
    );
  });
};

const fetchBooksWithReviewsByIds = (bookIds) => {
  const booksWithReviewsQuery = `
    SELECT b.id, b.title, b.description, b.author, b.image_url, br.star_rating, br.comment
    FROM books b
    INNER JOIN book_reviews br
    ON b.id = br.book_id
    WHERE b.id IN (?);
`;
  return new Promise((resolve, reject) => {
    db.query({ sql: booksWithReviewsQuery, values: [bookIds] }, (err, rows) => {
      if (err) reject(err);
      resolve(rows);
    });
  });
};

const formatBooksWithSortedRatings = ({
  booksWithReviews,
  sortedBooksWithAvgRatings,
}) => {
  /* 
    booksWtihReviews = [{book1, review1}, {book1, review2},....]
    sortedBooksWithAvgRatings = [{avg_rating: 5, book_id: 3, avg_rating: 4, book_id: 1}]
    */
  const books = [];

  // merge reviews of each book in a single book object
  const bookById = {};
  booksWithReviews.forEach((book) => {
    const review = { reviewStars: book.star_rating, comment: book.comment };

    if (!bookById.hasOwnProperty(book.id)) {
      bookById[book.id] = {
        id: book.id,
        title: book.title,
        author: book.author,
        description: book.description,
        imageUrl: book.image_url,
        reviews: [review],
      };
    } else {
      bookById[book.id].reviews.push(review);
    }
  });

  sortedBooksWithAvgRatings.forEach((bookWithAvgRating) => {
    const bookId = bookWithAvgRating.book_id;
    const formattedBook = bookById[bookId];
    formattedBook.averageRating = bookWithAvgRating.avg_rating;

    formattedBook.reviews = _.orderBy(
      formattedBook.reviews,
      ['reviewStars'],
      'desc'
    );

    books.push(formattedBook);
  });
  return books;
};

/**
 * GetBooksWithReviewsSortedByRatings:
 * 1. Fetch books ids with sorted avg ratings from book_reviews table
 * 2. Fetch books with reviews for above book ids
 * 3. Format the books with desired response format
 */
const GetBooksWithReviewsSortedByRatings = async (options) => {
  const limit = options.limit ? options.limit : options.defaultLimit;
  const offset = options.offset ? options.offset : 0;

  const booksWithAvgRatings = await fetchBooksWithAverageRatings(limit, offset);
  if (!booksWithAvgRatings || !booksWithAvgRatings.length) return [];

  const sortedBooksWithAvgRatings = _.orderBy(
    booksWithAvgRatings,
    ['avg_rating'],
    'desc'
  );

  // extract book ids from sorted books
  const bookIdsSortedByRatings = _.map(sortedBooksWithAvgRatings, 'book_id');

  const booksWithReviews = await fetchBooksWithReviewsByIds(
    bookIdsSortedByRatings
  );
  if (!booksWithReviews || !booksWithReviews.length) return [];

  return formatBooksWithSortedRatings({
    booksWithReviews,
    sortedBooksWithAvgRatings,
  });
};

const fetchBooksByIds = (bookIds) => {
  const booksByIdsQuery = `
  SELECT b.id, b.title, b.description, b.author, b.image_url
  FROM books b
  WHERE b.id IN (?);
`;

  return new Promise((resolve, reject) => {
    db.query({ sql: booksByIdsQuery, values: bookIds }, (err, rows) => {
      if (err) reject(err);
      resolve(rows);
    });
  });
};

const BookExistById = async (bookId) => {
  const books = await fetchBooksByIds([bookId]);
  if (!books || !books.length) return false;

  const book = books[0];
  return book && book.id;
};

module.exports = { BookExistById, GetBooksWithReviewsSortedByRatings };
