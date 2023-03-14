'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Users, { foreignKey: "idUser" });

      this.belongsTo(models.BankOfUsers, { foreignKey: "idbankOfUser" });

      this.belongsTo(models.ReceiveBanks, { foreignKey: "idReceiveBank" });

      this.belongsTo(models.Imgs, { foreignKey: "img" })
    }
  }
  Payments.init({
    idUser: DataTypes.INTEGER,
    idbankOfUser: DataTypes.INTEGER,
    idReceiveBank: DataTypes.INTEGER,
    amount: DataTypes.STRING,
    img: DataTypes.INTEGER,
    command: DataTypes.STRING,
    sign: DataTypes.STRING,
    status: DataTypes.STRING,
    message: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Payments',
  });
  return Payments;
};