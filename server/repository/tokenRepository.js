//create repository for Token Table
const { Token } = require('../models/models');

class TokenRepository {
  async create(userId, refreshToken) {
    const newToken = await Token.create({ refreshToken, userId });
    return newToken;
  }

  async getTokenByUserId(userId) {
    const tokenData = await Token.findOne({ where: { userId } });
    return tokenData;
  }

  async update(userId, refreshToken) {
    const newToken = await Token.update(
      { refreshToken },
      {
        where: {
          userId,
        },
      }
    );
    return newToken;
  }

  async delete(token) {
    const removedToken = await Token.destroy({
      where: { refreshToken: token },
    });
    return removedToken;
  }

  async findByToken(refreshToken) {
    const token = await Token.findOne({ where: { refreshToken } });
    return token;
  }
}

module.exports = new TokenRepository();
