'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ReceiveBanks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Banks, { foreignKey: "idBank" });
      this.hasMany(models.Payments, { foreignKey: "idReceiveBank" })
    }
  }
  ReceiveBanks.init({
    idBank: DataTypes.INTEGER,
    number: DataTypes.STRING,
    owner: DataTypes.STRING,
    branch: DataTypes.STRING,
    fixedCharge: DataTypes.STRING,
    fees: DataTypes.STRING,
    limitFree: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ReceiveBanks',
  });
  return ReceiveBanks;
};