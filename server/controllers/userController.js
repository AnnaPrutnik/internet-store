const userRepository = require('../repository/userRepository');
const basketRepository = require('../repository/basketRepository');
const ApiError = require('../errors/ApiError');
const messages = require('../config/messages');
const generateToken = require('../helpers/generateToken');
const bcrypt = require('bcrypt');

class UserController {
  async registration(req, res, next) {
    const { email, password, role } = req.body;
    if (!email || !password) {
      return next(ApiError.badRequest(messages.invalidCredential));
    }

    const candidate = await userRepository.getByEmail(email);

    if (candidate) {
      return next(ApiError.badRequest(messages.userExist));
    }
    const hashPassword = await bcrypt.hash(password, 5);
    try {
      const user = await userRepository.create({
        email,
        password: hashPassword,
        role,
      });

      basketRepository.create(user.id);
      const token = await generateToken(user.id, email, user.role);
      res
        .status(200)
        .json({ status: 200, message: messages.successResponse, data: token });
    } catch (error) {
      return next(ApiError.badRequest({ message: error.message }));
    }
  }

  async login(req, res) {
    res.status(200).json({ message: 'success login' });
  }

  async checkAuth(req, res, next) {
    const { id } = req.query;
    if (!id) {
      return next(ApiError.badRequest('Did not send id'));
    }
    res.status(200).json({ message: 'success checkAuth', id });
  }

  async logout(req, res) {
    res.status(200).json({ message: 'success logout' });
  }
}

module.exports = new UserController();
