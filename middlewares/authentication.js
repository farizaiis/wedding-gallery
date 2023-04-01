require('dotenv').config();
// const { getUserData } = require('../helper/jwt')
const jwt = require('jsonwebtoken');

const { admin_wedding } = require('../models');

async function login_check(req, res, next) {
  const bearerToken = req.header('Authorization');

  try {
    const token = bearerToken.replace('Bearer ', '');
    const decoded = jwt.verify(token, secretKey);

    req.users = decoded;

    const check_admin = await admin_wedding.findOne({
      where: {
        id: req.users.id,
      },
    });

    if (Date.now() >= req.users.exp*1000 || check_admin.dataValues.token === null || check_admin.dataValues.token === undefined) {
      return res.status(401).json({
        status: 'failed',
        message: 'Login required',
      });
    }
    
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      status: 'failed',
      message: 'Login required',
    });
  }
}

module.exports = { login_check };
