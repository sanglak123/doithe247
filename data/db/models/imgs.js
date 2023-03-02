'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Imgs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.Users, { foreignKey: "avatar" });

      this.hasOne(models.Cards, { foreignKey: "img" });

      this.hasOne(models.Payments, { foreignKey: "img" });
    }
  }
  Imgs.init({
    fileName: DataTypes.STRING,
    path: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Imgs',
  });
  return Imgs;
};