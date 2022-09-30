const ApiError = require('../errors/ApiError');
const messages = require('../config/messages');

function checkId(req, res, next) {
  const { id } = req.params;
  if (!id) {
    return next(ApiError.badRequest(messages.shouldIncludeId));
  }
  if (isNaN(Number(id))) {
    return next(ApiError.badRequest(messages.wrongTypeOfId));
  }
  next();
}

module.exports = checkId;
