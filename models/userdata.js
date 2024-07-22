'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserData extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserData.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    address: DataTypes.STRING,
    occupation: DataTypes.STRING,
    birthdate: DataTypes.DATE,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UserData',
  });
  return UserData;
};