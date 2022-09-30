const brandRepository = require('../repository/brandRepository');
const messages = require('../config/messages');

class BrandController {
  async getAll(req, res) {
    const brands = await brandRepository.getAll();
    res
      .status(200)
      .json({ status: 200, message: messages.successResponse, data: brands });
  }

  async getSingle(req, res) {
    const { id } = req.params;
    const brand = await brandRepository.getSingle(id);
    if (brand) {
      return res
        .status(200)
        .json({ status: 200, message: messages.successResponse, data: brand });
    }
    res
      .status(200)
      .json({ status: 200, messages: messages.successResponse, data: null });
  }

  async create(req, res) {
    const { name } = req.body;
    const brand = await brandRepository.create(name);
    res
      .status(200)
      .json({ status: 201, message: messages.successResponse, data: brand });
  }

  async delete(req, res) {
    const { id } = req.params;
    const result = await brandRepository.delete(id);
    if (result === 1) {
      return res
        .status(200)
        .json({ status: 200, message: messages.successResponse });
    }
    res.status(404).json({ status: 404, message: messages.noItem });
  }
}

module.exports = new BrandController();
