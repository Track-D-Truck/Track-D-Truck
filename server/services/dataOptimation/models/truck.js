'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Truck extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Truck.belongsTo(models.Driver)
    }
  };
  Truck.init({
    truck_code: DataTypes.STRING,
    capacity: DataTypes.INTEGER,
    cost: DataTypes.INTEGER,
    status: DataTypes.STRING,
    location: DataTypes.STRING,
    DriverId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Truck',
  });
  return Truck;
};