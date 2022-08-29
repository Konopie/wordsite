const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const credential = require('credential');
pw = credential();
const {hashPassword} = require('../util/helpers')

class User extends Model {}

User.init(
  {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
    username: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4]
      }
    }
  },
  {
    hooks: {
      async beforeBulkCreate(newUserData) {
        console.log('begin hash')
        for (let i = 0; i < newUserData.length; i++) {
          newUserData[i].dataValues.password = await hashPassword(newUserData[i].dataValues.password);
        }
        return newUserData;
      },

      async beforeCreate(newUserData) {
        newUserData.password = await hashPassword(newUserData.password)
        return newUserData
      },

      async beforeUpdate(updatedUserData) {
        updatedUserData.password = await hashPassword(updatedUserData.password)
        return updatedUserData
      }
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user'
  }
);

module.exports = User;