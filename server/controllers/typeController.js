const { validationResult } = require('express-validator');
const typeRepository = require('../repository/typeRepository');
const messages = require('../config/messages');
const ApiError = require('../errors/ApiError');

class TypeController {
  async getAll(req, res) {
    try {
      const types = await typeRepository.getAll();
      return res.status(200).send(types);
    } catch (error) {
      return next(ApiError.badRequest(errors.array()));
    }
  }

  async getSingle(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(ApiError.badRequest(errors.array()));
    }
    try {
      const { id } = req.params;
      const type = await typeRepository.getSingle(id);
      return res.status(200).send(type);
    } catch (error) {
      return next(ApiError.badRequest(errors.array()));
    }
  }

  async create(req, res, next) {
    const { name } = req.body;
    try {
      const type = await typeRepository.create(name);
      res.status(201).json({ type });
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async delete(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(ApiError.badRequest(errors.array()));
    }
    try {
      const { id } = req.params;
      const result = await typeRepository.delete(id);
      if (result === 1) {
        return res.status(200);
      }
      return res.status(404).json({ message: messages.noItem });
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }
}

module.exports = new TypeController();
