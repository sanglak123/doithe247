'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Promotions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Events, { foreignKey: "idEvent" });
      this.belongsTo(models.Users, { foreignKey: "idUser" });
    }
  }
  Promotions.init({
    idEvent: DataTypes.INTEGER,
    idUser: DataTypes.INTEGER,
    key: DataTypes.STRING,
    status:DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Promotions',
  });
  return Promotions;
};