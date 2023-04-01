require('dotenv').config();
const jwt = require('jsonwebtoken');
const secret_key = process.env.SECRET_KEY_JWT;

function generate_token(data_user = {}) {
  let token = jwt.sign(data_user, secret_key, {
    expiresIn : '24h'
  });
  return token;
}

module.exports = { generate_token };
