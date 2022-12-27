const express = require('express');
const router = express.Router();

const { CREATED } = require('../common/responseCodes.js');
const ReviewsController = require('../controllers/reviews');

router.post('/addReview', async (req, res) => {
  const { err, resp } = await ReviewsController.addBookReview(req.body);
  if (err && err.isError) {
    return res.status(err.respStatusCode).send({ err: err.msg });
  }

  res.status(CREATED).send(resp);
});

module.exports = router;
