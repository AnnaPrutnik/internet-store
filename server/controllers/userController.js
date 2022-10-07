const messages = require('../config/messages');
const userRepository = require('../repository/userRepository');
const basketRepository = require('../repository/basketRepository');

class UserController {
  async getUsers(req, res, next) {
    try {
      const users = await userRepository.getAll();
      res.status(200).send(users);
    } catch (error) {
      return next(ApiError.badRequest(error.message));
    }
  }
}

module.exports = new UserController();
