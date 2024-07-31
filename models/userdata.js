'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserData extends Model {
    
    static associate(models) {
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