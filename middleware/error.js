module.exports = function (err, req, res, next) {
  console.error(err.message, err);
  res.status(500).send('Server is not responding, try after sometime!');
};
