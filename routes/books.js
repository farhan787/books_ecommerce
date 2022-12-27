const express = require('express');
const router = express.Router();

const { getBooks: getBooksController } = require('../controllers/books');

router.get('/', (req, res) => {
  // fetch data from req or url if required
  const data = getBooksController();
  res.send(data);
});

module.exports = router;
