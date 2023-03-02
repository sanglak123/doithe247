'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TypeCards extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Cards, {foreignKey:"idTypeCard"});
    }
  }
  TypeCards.init({
    name: DataTypes.STRING 
  }, {
    sequelize,
    modelName: 'TypeCards',
  });
  return TypeCards;
};