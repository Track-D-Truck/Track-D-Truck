'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Trucks', {
      id: {
        allowNull: false,
        autoIncrement: true,  
        primaryKey: true, 
        type: Sequelize.INTEGER
      },
      truck_code: {
        type: Sequelize.STRING,
        unique:true
      },
      capacity: {
        type: Sequelize.INTEGER 
      },
      cost: {
        type: Sequelize.INTEGER
      },
      status: { 
        type: Sequelize.STRING
      },
      location: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Trucks');
  }
};