'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Prices extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Cards, { foreignKey: "idCard" });
      this.belongsTo(models.Values, { foreignKey: "idValue" });
      this.hasMany(models.Products, { foreignKey: "idPrice" });
    }
  }
  Prices.init({
    idCard: DataTypes.INTEGER,
    idValue: DataTypes.INTEGER,
    feesChange: DataTypes.FLOAT,
    feesBuy: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Prices',
  });
  return Prices;
};