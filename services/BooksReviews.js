const db = require('../startup/db');

const AddBookReview = ({ bookId, comment, reviewStars }) => {
  const insertReviewQuery = `
  INSERT INTO book_reviews
    (book_id, star_rating, comment) 
    VALUES (?, ?, ?);
  `;

  return new Promise((resolve, reject) => {
    db.query(
      { sql: insertReviewQuery, values: [bookId, reviewStars, comment] },
      (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      }
    );
  });
};

module.exports = { AddBookReview };
