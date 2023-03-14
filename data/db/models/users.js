'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Payments, { foreignKey: "idUser" });

      this.hasMany(models.Products, { foreignKey: "idUser" });
      this.hasMany(models.Promotions, { foreignKey: "idUser" });

      this.hasOne(models.RefreshTokens, { foreignKey: "idUser" });
      this.belongsTo(models.Imgs, { foreignKey: "avatar" });

    }
  }
  Users.init({
    userName: DataTypes.STRING,
    displayName: DataTypes.STRING,
    fullName: DataTypes.STRING,
    adress: DataTypes.STRING,
    pass: DataTypes.STRING,
    pass2: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    avatar: DataTypes.INTEGER,
    surplus: DataTypes.STRING,
    admin: DataTypes.BOOLEAN,
    wallet_number: DataTypes.STRING,
    partner_key: DataTypes.STRING,
    api_key: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};