const { User } = require('../models/models');

class UserRepository {
  async getByEmail(email) {
    const user = await User.findOne({
      where: { email },
    });
    return user;
  }

  async getByActivateLink(link) {
    const user = await User.findOne({
      where: {
        activationLink: link,
      },
    });
    return user;
  }

  async getByPk(id) {
    const user = await User.findByPk(id);
    return user;
  }

  async getAll() {
    const users = await User.findAll();
    return users;
  }

  async create({ email, password, role, activationLink }) {
    const user = await User.create({ email, password, role, activationLink });
    return user;
  }

  async updateUserActivate(id) {
    await User.update(
      { isActivated: true },
      {
        where: {
          id,
        },
      }
    );
  }
}

module.exports = new UserRepository();
