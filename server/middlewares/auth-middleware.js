const ApiError = require('../errors/ApiError');
const tokenService = require('../services/token-service');

module.exports = function (req, res, next) {
  if (req.method === 'OPTIONS') {
    next();
  }
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return next(ApiError.UnauthorizedError());
    }
    const accessToken = authorizationHeader.split(' ')[1];
    if (!accessToken) {
      return next(ApiError.UnauthorizedError());
    }
    const validateToken = tokenService.validateAccessToken(accessToken);
    if (!validateToken) {
      return next(ApiError.UnauthorizedError());
    }
    req.user = validateToken;
    next();
  } catch (error) {
    return next(ApiError.badRequest('some problem'));
  }
};
