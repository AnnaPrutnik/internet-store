const { validationResult } = require('express-validator');
const brandRepository = require('../repository/brandRepository');
const messages = require('../config/messages');
const ApiError = require('../errors/ApiError');

class BrandController {
  async getAll(req, res) {
    try {
      const brands = await brandRepository.getAll();
      res.status(200).send(brands);
    } catch (error) {
      return next(ApiError.badRequest(errors.message));
    }
  }

  async getSingle(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(ApiError.badRequest(errors.message));
    }
    try {
      const { id } = req.params;
      const brand = await brandRepository.getSingle(id);
      res.status(200).send(brand);
    } catch (error) {
      return next(ApiError.badRequest(errors.message));
    }
  }

  async create(req, res) {
    try {
      const { name } = req.body;
      const brand = await brandRepository.create(name);
      res.status(201).send(brand);
    } catch (error) {
      return next(ApiError.badRequest(errors.message));
    }
  }

  async delete(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(ApiError.badRequest(errors.array()));
    }
    try {
      const { id } = req.params;
      const result = await brandRepository.delete(id);
      if (result === 1) {
        return res.status(200);
      }
      res.status(404).json({ message: messages.noItem });
    } catch (error) {
      return next(ApiError.badRequest(errors.message));
    }
  }
}

module.exports = new BrandController();
