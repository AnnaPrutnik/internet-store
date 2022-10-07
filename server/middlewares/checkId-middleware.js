const ApiError = require('../errors/ApiError');
const messages = require('../config/messages');

function checkId(req, res, next) {
  const { id } = req.params;
  if (!id) {
    return next(ApiError.badRequest(messages.shouldIncludeId));
  }
  next();
}

module.exports = checkId;
