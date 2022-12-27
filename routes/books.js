const express = require('express');
const router = express.Router();

const BooksController = require('../controllers/books');

router.get('/', async (req, res) => {
  const { resp, err } = await BooksController.getBooks(req);
  if (err && Object.keys(err).length) {
    return res.status(err.respStatusCode).send({ err: err.message });
  }

  res.send(resp);
});

module.exports = router;
