const { Brand } = require('../models/models');

class BrandRepository {
  async getAll() {
    const brands = await Brand.findAll();
    return brands;
  }

  async getSingle(id) {
    const brand = await Brand.findOne({ where: { id } });
    return brand;
  }

  async create(name) {
    const brand = await Brand.create({ name });
    return brand;
  }

  async delete(id) {
    const response = await Brand.destroy({ where: { id } });
    return response;
  }
}

module.exports = new BrandRepository();
