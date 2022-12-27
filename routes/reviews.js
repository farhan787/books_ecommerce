const express = require('express');
const router = express.Router();

const ReviewsController = require('../controllers/reviews');

router.post('/addReview', async (req, res) => {
  const { err, resp } = await ReviewsController.addBookReview(req.body);
  if (err && Object.keys(err).length) {
    return res.status(err.respStatusCode).send({ err: err.message });
  }

  res.send(resp);
});

module.exports = router;
