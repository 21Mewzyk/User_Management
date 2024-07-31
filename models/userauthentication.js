'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserAuthentication extends Model {
    
    static associate(models) {
    }
  }
  UserAuthentication.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UserAuthentication',
  });
  return UserAuthentication;
};