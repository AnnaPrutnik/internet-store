var jwt = require('jsonwebtoken');
const tokenRepository = require('../repository/tokenRepository');

class TokenService {
  generate(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: '15m',
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: '30d',
    });
    return { accessToken, refreshToken };
  }

  async get(token) {
    return await tokenRepository.findByToken(token);
  }

  async save(userId, refreshToken) {
    const tokenData = await tokenRepository.getTokenByUserId(userId);
    if (tokenData) {
      return tokenRepository.update(userId, refreshToken);
    }
    const token = await tokenRepository.create(userId, refreshToken);
    return token;
  }

  async delete(refreshToken) {
    return await tokenRepository.delete(refreshToken);
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      return userData;
    } catch (error) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      return userData;
    } catch (error) {
      return null;
    }
  }
}

module.exports = new TokenService();
