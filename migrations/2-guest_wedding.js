'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('guest_wedding', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fullname: {
        type: Sequelize.STRING(50)
      },
      address: {
        type: Sequelize.STRING(150)
      },
      phone: {
        type: Sequelize.CHAR(15)
      },
      notes: {
        type: Sequelize.STRING(150)
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
     * await queryInterface.dropTable('guest_wedding');
     */
  }
};
