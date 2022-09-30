const { User, Basket } = require('../models/models');

class UserRepository {
  async getByEmail(email) {
    const user = await User.findOne({ where: { email } });
    return user;
  }

  async create({ email, password, role }) {
    console.log('password', password);
    const user = await User.create({ email, password, role });
    return user;
  }

  async login() {
    return;
  }

  async logout() {
    return;
  }

  async checkAuth() {
    return;
  }
}

module.exports = new UserRepository();
