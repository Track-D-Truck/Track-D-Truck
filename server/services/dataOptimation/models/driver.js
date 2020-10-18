 
'use strict';
const {
  Model
} = require('sequelize');
const {hashPass} = require(`../helpers/bcrypt`)
module.exports = (sequelize, DataTypes) => {
  class Driver extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */


    static associate(models) {
      // define association here
      Driver.hasOne(models.Truck) 
    }
  };
  Driver.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: `Name is required!`
        },
        notEmpty: {
          args: true,
          msg: `Name must be filled!`
        }
      }
    },
    phone:DataTypes.STRING,
    status:DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          args: true,
          msg: `Email is required!`
        },
        notEmpty: {
          args: true,
          msg: `Email must be filled!`
        },
        isEmail: {
          args: true,
          msg: `Email must be in format yourname@example.com`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: `Password is required!`
        },
        notEmpty: {
          args: true,
          msg: `Password must be filled!`
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: `Role is required!`
        },
        notEmpty: {
          args: true,
          msg: `Role must be filled!`
        }
      }
    }
  }, {
    hooks: {
      beforeCreate(driver) {
        driver.password = hashPass(driver.password)
      }
    },
    sequelize,
    modelName: 'Driver'
  });
  return Driver;
};