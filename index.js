const express = require('express');
const app = express();

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

require('./startup/handleAsyncErrors')();
require('./startup/routes')(app);

const port = process.env.PORT || 8080;
const server = app.listen(port, () =>
  console.info(`Listening on port ${port}...`)
);

module.exports = server;
