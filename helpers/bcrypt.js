const bcrypt = require('bcrypt');

function encrypt(rawPass) {
  const saltRounds = 10;
  const hash = bcrypt.hashSync(rawPass, saltRounds);
  return hash;
}

function compare_pass(rawPw, hashedPw) {
  return bcrypt.compare(rawPw, hashedPw);
}

module.exports = { encrypt, compare_pass };
