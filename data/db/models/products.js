'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Users, { foreignKey: "idUser" });
      this.belongsTo(models.Prices, { foreignKey: "idPrice" });
    }
  }
  Products.init({
    idUser: DataTypes.INTEGER,
    command: DataTypes.STRING,
    idPrice: DataTypes.INTEGER,
    feesChange: DataTypes.STRING,
    feesBuy: DataTypes.STRING,
    receiveValue: DataTypes.STRING,
    code: DataTypes.STRING,
    serial: DataTypes.STRING,
    sign: DataTypes.STRING,
    request_id: DataTypes.STRING,
    status: DataTypes.STRING,
    count: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Products',
  });
  return Products;
};