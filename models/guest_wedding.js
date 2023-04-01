'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class guest_wedding extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        
    }
  }
  guest_wedding.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      fullname: DataTypes.STRING(50),
      fullname: DataTypes.STRING(50),
      address: DataTypes.STRING(150),
      phone: DataTypes.CHAR(15),
      notes: DataTypes.STRING(150),
      created_at: DataTypes.DATE(6),
      updated_at: DataTypes.DATE(6),
      deleted_at: DataTypes.DATE(6),
    },
    {
      sequelize,
      paranoid: true,
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
      freezeTableName: true,
      modelName: 'guest_wedding',
    }
  );
  return guest_wedding;
};
