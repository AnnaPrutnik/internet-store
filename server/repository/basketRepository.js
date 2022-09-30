const { Basket } = require('../models/models');

class BasketRepository {
  async create(userId) {
    const basket = await Basket.create({ userId });
    return basket;
  }
}

module.exports = new BasketRepository();
