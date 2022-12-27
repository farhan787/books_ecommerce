const { INTERNAL_SERVER_ERROR } = require('../common/responseCodes');
const { SERVER_UNRESPONSIVE } = require('../common/errorMessages');

module.exports = function (err, req, res, next) {
  console.error(err.message, err);
  res.status(INTERNAL_SERVER_ERROR).send(SERVER_UNRESPONSIVE);
};
