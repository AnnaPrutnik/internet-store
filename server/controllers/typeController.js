const typeRepository = require('../repository/typeRepository');
const messages = require('../config/messages');

class TypeController {
  async getAll(req, res) {
    const types = await typeRepository.getAll();
    res
      .status(200)
      .json({ status: 200, message: messages.successResponse, data: types });
  }

  async getSingle(req, res) {
    const { id } = req.params;
    const type = await typeRepository.getSingle(id);
    if (type) {
      return res
        .status(200)
        .json({ status: 200, message: messages.successResponse, data: type });
    }
    res
      .status(200)
      .json({ status: 200, messages: messages.successResponse, data: null });
  }

  async create(req, res) {
    const { name } = req.body;
    const type = await typeRepository.create(name);
    res
      .status(201)
      .json({ status: 201, message: messages.successResponse, data: type });
  }

  async delete(req, res) {
    const { id } = req.params;
    const result = await typeRepository.delete(id);
    if (result === 1) {
      return res
        .status(200)
        .json({ status: 200, message: messages.successResponse });
    }
    res.status(404).json({ status: 404, message: messages.noItem });
  }
}

module.exports = new TypeController();
