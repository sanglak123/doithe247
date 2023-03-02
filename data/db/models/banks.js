'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Banks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.BankOfUsers, { foreignKey: "idBank" });    
      this.hasMany(models.ReceiveBanks, { foreignKey: "idBank" });
    }
  }
  Banks.init({
    name: DataTypes.STRING,
    sign: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Banks',
  });
  return Banks;
};