const { Type } = require('../models/models');

class TypeRepository {
  async getAll() {
    const types = await Type.findAll();
    return types;
  }

  async getSingle(id) {
    const type = await Type.findOne({ where: { id } });
    return type;
  }

  async create(name) {
    const type = await Type.create({ name });
    return type;
  }

  async delete(id) {
    const response = await Type.destroy({ where: { id } });
    return response;
  }
}

module.exports = new TypeRepository();
