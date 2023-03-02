'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Events extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Promotions, { foreignKey: "idEvent" });
    }
  }
  Events.init({
    name: DataTypes.STRING,
    discount: DataTypes.INTEGER,
    timeStart: DataTypes.DATE,
    timeEnd: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Events',
  });
  return Events;
};