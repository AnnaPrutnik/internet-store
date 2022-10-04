const messages = require('../config/messages');

class ApiError extends Error {
  status;
  message;

  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }

  static UnauthorizedError() {
    return new ApiError(401, messages.unauthorized);
  }

  static badRequest(message) {
    return new ApiError(400, message);
  }

  static internal(message) {
    return new ApiError(500, message);
  }

  static forbidden(message) {
    return new ApiError(403, message);
  }
}

module.exports = ApiError;
