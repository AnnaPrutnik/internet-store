const authService = require('../services/auth-service');
const userRepository = require('../repository/userRepository');
const basketRepository = require('../repository/basketRepository');
const ApiError = require('../errors/ApiError');
const messages = require('../config/messages');
const { validationResult } = require('express-validator');

class UserController {
  async registration(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(ApiError.badRequest(errors.array()));
    }
    const { email, password } = req.body;
    if (!email || !password) {
      return next(ApiError.badRequest(messages.invalidCredential));
    }
    try {
      const data = await authService.registration(email, password);
      res.cookie('refreshToken', data.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res
        .status(200)
        .json({ message: messages.successResponse, ...data });
    } catch (error) {
      return next(ApiError.badRequest(error.message));
    }
  }

  async login(req, res, next) {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(ApiError.badRequest(messages.invalidCredential));
    }
    try {
      const data = await authService.login(email, password);
      res.cookie('refreshToken', data.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res
        .status(200)
        .json({ message: messages.successResponse, ...data });
    } catch (error) {
      return next(ApiError.badRequest(error.message));
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      if (!refreshToken) {
        throw new Error(messages.unauthorized);
      }
      const token = await authService.logout(refreshToken);
      res.clearCookie('refreshToken');
      res.status(200).json({
        message: 'success logout',
        token,
      });
    } catch (error) {
      return next(ApiError.badRequest(error.message));
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const data = await authService.refresh(refreshToken);
      res.cookie('refreshToken', data.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      res.status(200).json({ message: 'success refresh', ...data });
    } catch (error) {
      return next(ApiError.badRequest(error.message));
    }
  }

  async activate(req, res, next) {
    try {
      const { link } = req.params;
      await authService.activate(link);
      return res.redirect(process.env.CLIENT_URL);
    } catch (error) {
      return next(ApiError.badRequest(error.message));
    }
  }

  async getUsers(req, res, next) {
    try {
      const users = await userRepository.getAll();
      res.status(200).json({ message: messages.successResponse, data: users });
    } catch (error) {
      return next(ApiError.badRequest(error.message));
    }
  }
}

module.exports = new UserController();
