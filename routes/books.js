const express = require('express');
const router = express.Router();

const BooksController = require('../controllers/books');

router.get('/', async (req, res) => {
  const { err, resp } = await BooksController.getBooks(req);
  if (err && err.isError) {
    return res.status(err.respStatusCode).send({ err: err.msg });
  }

  res.send(resp);
});

module.exports = router;
