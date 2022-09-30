const jwt = require('jsonwebtoken');

async function generateToken(id, email, role) {
  return await jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
    expiresIn: '24h',
  });
}

module.exports = generateToken;
