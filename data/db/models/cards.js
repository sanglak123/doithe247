'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cards extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.TypeCards, { foreignKey: "idTypeCard" });
      this.belongsTo(models.Imgs, { foreignKey: "img" })
    }
  }
  Cards.init({
    idTypeCard: DataTypes.INTEGER,
    telco: DataTypes.STRING,
    img: DataTypes.INTEGER,
    change: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Cards',
  });
  return Cards;
};