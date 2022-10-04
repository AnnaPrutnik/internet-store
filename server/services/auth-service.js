const userRepository = require('../repository/userRepository');
const basketRepository = require('../repository/basketRepository');
const messages = require('../config/messages');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const mailService = require('./mail-service');
const tokenService = require('./token-service');
const UserDto = require('../dto/user-dto');
const ApiError = require('../errors/ApiError');

class AuthService {
  async #generateToken(user) {
    const newUserDto = new UserDto(user);
    const tokens = tokenService.generate({ ...newUserDto });
    await tokenService.save(newUserDto.id, tokens.refreshToken);
    return { ...tokens, user: newUserDto };
  }

  async registration(email, password) {
    const user = await userRepository.getByEmail(email);
    if (user) {
      throw new Error(messages.userExist(email));
    }
    const hashPassword = await bcrypt.hash(password, 5);
    const activationLink = uuidv4();

    const newUser = await userRepository.create({
      email,
      password: hashPassword,
      activationLink,
    });

    await mailService.sendActivationMail(
      email,
      `${process.env.API_URL}/api/user/activate/${activationLink}`
    );
    const result = await this.#generateToken(newUser);
    return result;
  }

  async activate(link) {
    const user = await userRepository.getByActivateLink(link);
    if (!user) {
      throw new Error(messages.notUserWithLink);
    }
    if (user.isActivated) {
      throw new Error(messages.isAlreadyActivated);
    }
    await userRepository.updateUserActivate(user.id);
  }

  async login(email, password) {
    const user = await userRepository.getByEmail(email);
    if (!user) {
      throw new Error(messages.userNotExist(email));
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new Error(messages.invalidCredential);
    }
    const result = await this.#generateToken(user);
    return result;
  }

  async logout(refreshToken) {
    const token = await tokenService.delete(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.get(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }
    const user = await userRepository.getByPk(userData.id);
    const result = await this.#generateToken(user);
    return result;
  }
}

module.exports = new AuthService();
