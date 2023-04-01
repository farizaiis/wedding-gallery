const Joi = require('joi');
const { guest_wedding } = require('../models');
require('dotenv').config();
const { Op } = require('sequelize');

module.exports = {
    post_notes: async (req, res) => {
      try {
        const body = req.body;
  
        const schema = Joi.object({
          fullname: Joi.string().min(1).max(50).required(),
          address: Joi.string().min(1).max(20).required(),
          phone: Joi.string().min(10).max(20).required(),
          notes: Joi.string().min(1).max(20).required(),
        });
  
        const cek_input = schema.validate(
          {
            fullname: body.fullname,
            address: body.address,
            phone: body.phone,
            notes: body.notes,
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

        const today = new Date();
        const month = '' + (today.getMonth() + 1);
        const day = '' + today.getDate();
        const year = today.getFullYear();
        const date = [year, month, day].join('-');

        let number_phone = Array.from(body.phone)[0] === '6' ? body.phone.replace(/^.{2}/g, '0') : body.phone
  
        const check_post = await guest_wedding.findAll({
          where : {
            phone: number_phone,
            created_at: {
              [Op.lt]: new Date(new Date(date).getTime() + 60 * 60 * 24 * 1000),
              [Op.gte]: date,
            }
          }
        })

        if(check_post.length > 2) {
          return res.status(400).json({
            status: 'failed',
            message: 'You already send notes 3 times today, please submit another day',
          });
        }

        const create_data = await guest_wedding.create({
          fullname: body.fullname,
            address: body.address,
            phone: number_phone,
            notes: body.notes,
        });

        return res.status(200).json({
          status: 'success',
          message: 'Success create guest notes',
          data: create_data
        });
      } catch (error) {
        console.log(error);
        return res.status(500).json({
          status: 'failed',
          message: 'Internal Server Error',
        });
      }
    },

    update_notes: async (req, res) => {
      try {
        const body = req.body;
        const id = req.params.id
  
        const schema = Joi.object({
          fullname: Joi.string().min(1).max(50).allow(null).allow(''),
          address: Joi.string().min(1).max(20).allow(null).allow(''),
          phone: Joi.string().min(10).max(20).allow(null).allow(''),
          notes: Joi.string().min(1).max(20).allow(null).allow(''),
        });
  
        const cek_input = schema.validate(
          {
            fullname: body.fullname,
            address: body.address,
            phone: body.phone,
            notes: body.notes,
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

       await guest_wedding.update({
          fullname: body.fullname,
            address: body.address,
            phone: Array.from(body.phone)[0] === '6' ? body.phone.replace(/^.{2}/g, '0') : body.phone,
            notes: body.notes,
        }, {
          where : {
            id : id
          }
        });

        const check_notes = await guest_wedding.findOne({
          where : {
            id : id
          }
        })

        return res.status(200).json({
          status: 'success',
          message: 'Success update guest notes',
          data: check_notes
        });
      } catch (error) {
        console.log(error);
        return res.status(500).json({
          status: 'failed',
          message: 'Internal Server Error',
        });
      }
    },

    detail_notes: async (req, res) => {
      const bearer_token = req.header('Authorization');
      try {
        const id = req.params.id

        const check_notes = await guest_wedding.findOne({
          where : {
            id : id
          },
          attributes :{
            exclude : ['created_at', 'deleted_at', 'updated_at']
          }
        })

        if(!check_notes) {
          return res.status(404).json({
            status: 'failed',
            message: 'Data notes not found'
          });
        }

        if(!bearer_token) {
          delete check_notes.dataValues.phone
          delete check_notes.dataValues.address
        }

        return res.status(200).json({
          status: 'success',
          message: 'Success update guest notes',
          data: check_notes
        });
      } catch (error) {
        console.log(error);
        return res.status(500).json({
          status: 'failed',
          message: 'Internal Server Error',
        });
      }
    },

    get_all_notes: async (req, res) => {
      const bearer_token = req.header('Authorization');
      try {
        let check_notes

        if(bearer_token) {
          check_notes = await guest_wedding.findAll({
            attributes : ['id', 'fullname', 'notes', 'phone', 'address']
          })
        } else {
          check_notes = await guest_wedding.findAll({
            attributes : ['id', 'fullname', 'notes']
          }) 
        }

        if(!check_notes) {
          return res.status(404).json({
            status: 'failed',
            message: 'Data notes not found'
          });
        }

        return res.status(200).json({
          status: 'success',
          message: 'Success retrieve guest notes',
          data: check_notes
        });
      } catch (error) {
        return res.status(500).json({
          status: 'failed',
          message: 'Internal Server Error',
        });
      }
    },

    delete_notes: async (req, res) => {
      try {
        const id = req.params.id

        const check_notes = await guest_wedding.findOne({
          where : {
            id : id
          }
        })

        if(!check_notes) {
          return res.status(404).json({
            status: 'failed',
            message: 'Data notes not found'
          });
        }

        const delete_notes = await guest_wedding.destroy({
          where : {
            id : id
          }
        })

        if(!delete_notes) {
          return res.status(400).json({
            status: 'failed',
            message: 'Failed to delete notes'
          });
        }

        return res.status(200).json({
          status: 'success',
          message: 'Success update guest notes',
          data: check_notes
        });
      } catch (error) {
        console.log(error);
        return res.status(500).json({
          status: 'failed',
          message: 'Internal Server Error',
        });
      }
    },
  };
  