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
      this.belongsTo(models.Imgs, { foreignKey: "img" });
    }
  }
  Events.init({
    name: DataTypes.STRING,
    discount: DataTypes.INTEGER,
    timeStart: DataTypes.STRING,
    timeEnd: DataTypes.STRING,
    img: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Events',
  });
  return Events;
};