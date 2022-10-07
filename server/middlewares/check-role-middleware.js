const ApiError = require('../errors/ApiError');
const tokenService = require('../services/token-service');

module.exports = function checkRole(role) {
  return function (req, res, next) {
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
      const validateUser = tokenService.validateAccessToken(accessToken);
      if (!validateUser) {
        return next(ApiError.UnauthorizedError());
      }

      console.log('validate user', validateUser);
      if (validateUser.role !== role) {
        return next(ApiError.forbidden());
      }

      req.user = validateUser;
      next();
    } catch (error) {
      return next(ApiError.badRequest(error));
    }
  };
};
