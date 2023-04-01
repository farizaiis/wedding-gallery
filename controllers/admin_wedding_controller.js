const Joi = require('joi');
const { admin_wedding } = require('../models');
const { Op } = require('sequelize');
const moment = require('moment');
const { compare_pass, encrypt } = require('../helpers/bcrypt');
const { generate_token } = require('../helpers/jwt');

module.exports = {
    login_admin: async (req, res) => {
      try {
        const body = req.body;
  
        const schema = Joi.object({
          email: Joi.string().email().max(50).required(),
          password: Joi.string().max(20).required(),
        });
  
        const cek_input = schema.validate(
          {
            email: body.email,
            password: body.password,
          },
          { abortEarly: false }
        );
  
        if (cek_input.error) {
          return res.status(400).json({
            status: 'failed',
            message: 'Bad Request',
            errors: cek_input.error['details'].map(({ message }) => message),
          });
        }
  
        const check_admin = await admin_wedding.findOne({
          where : {
            email: body.email
          }
        })
  
        if (!check_admin) {
          return res.status(400).json({
            status: 'failed',
            message: 'Unregistered Email',
          });
        }
  
        const check_pass = await compare_pass(body.password, check_admin.dataValues.password);
        
        if(!check_pass) {
            return res.status(400).json({
                status: 'failed',
                message: 'Incorrect Password',
            });
        }
        
        const payload = {
            id: check_admin.dataValues.id,
            fullname: check_admin.dataValues.fullname,
            email: body.email,
        };

        const token = generate_token(payload);

        await admin_wedding.update(
        {
            token: token,
        },
        { 
            where: { email: body.email } }
        );
  
        return res.status(200).json({
            status: 'success',
            message: 'Sign In Success',
            data: payload,
            token: token,
        });    
      } catch (error) {
        return res.status(500).json({
          status: 'failed',
          message: 'Internal Server Error',
        });
      }
    },
  
    logout_admin: async (req, res) => {
      try {
        await admin_wedding.update(
            {
              token: null
            },
            {
              where: { email: req.users.email },
            }
        );
  
        return res.status(200).json({
          status: 'success',
          message: 'Log Out Success',
        });
      } catch (error) {
        return res.status(500).json({
          status: 'failed',
          message: 'Internal Server Error',
        });
      }
    },

    regist_admin: async (req, res) => {
    try {
        const body = req.body;

        const schema = Joi.object({
            fullname: Joi.string().max(50).required(),
            email: Joi.string().email().max(50).required(),
            password: Joi.string().max(20).required(),
        });

        const cek_input = schema.validate(
        {
            fullname: body.fullname,
            email: body.email,
            password: body.password,
        },
        { abortEarly: false }
        );

        if (cek_input.error) {
            return res.status(400).json({
                status: 'failed',
                message: 'Bad Request',
                errors: cek_input.error['details'].map(({ message }) => message),
            });
        }

        const check_admin = await admin_wedding.findOne({
            where : {
                email: body.email
            }
        })

        if (check_admin) {
            return res.status(400).json({
                status: 'failed',
                message: 'Registered Email, Please use another email',
            });
        }

        const create_admin = await admin_wedding.create({
            fullname: body.fullname,
            email: body.email,
            password: encrypt(body.password),
        });

        const payload = {
            id: create_admin.dataValues.id,
            fullname: body.fullname,
            email: body.email,
        };

        const token = generate_token(payload);

        await admin_wedding.update(
            {
                token: token,
            },
            { 
                where: { email: body.email } }
        );

        return res.status(200).json({
            status: 'success',
            message: 'Success Register Admin',
            data: payload,
            token: token,
        });    
    } catch (error) {
        console.log(error)
        return res.status(500).json({
        status: 'failed',
        message: 'Internal Server Error',
        });
    }
    },
  };
  