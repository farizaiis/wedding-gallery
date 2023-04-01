'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class admin_wedding extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        
    }
  }
  admin_wedding.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      fullname: DataTypes.STRING(50),
      email: DataTypes.STRING(50),
      password: DataTypes.CHAR(75),
      token: DataTypes.STRING,
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
      modelName: 'admin_wedding',
    }
  );
  return admin_wedding;
};
