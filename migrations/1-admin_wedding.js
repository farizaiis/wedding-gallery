'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('admin_wedding', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fullname: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      email: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      password: {
        type: Sequelize.STRING(75),
        allowNull: false
      },
      token: {
        type: Sequelize.STRING,
        allowNull: false
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE(6)
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE(6)
      },
      deleted_at: {
        allowNull: false,
        type: Sequelize.DATE(6)
      }
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('admin_wedding');
     */
  }
};
