const express = require('express');
const router = express.Router();

const {
  addBookReview: addBookReviewController,
} = require('../controllers/reviews');

router.post('/addReview', (req, res) => {
  const { err, success } = addBookReviewController(req.body);
  res.send({ err, success });
});

module.exports = router;
