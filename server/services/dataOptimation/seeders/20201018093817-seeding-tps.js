"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "TPStorages",
      [
        {
          name: "Terminal Dago",
          location: "-6.8672104, 107.6213954",
          status: "active",
          volume: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Cihampeulas",
          location: "-6.8881609, 107.6039859",
          status: "active",
          volume: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "GOR Saparua",
          location: "-6.9088007, 107.6158271",
          status: "active",
          volume: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Dipatiukur",
          location: "-6.8927743, 107.6166699",
          status: "active",
          volume: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Cieumbeluit",
          location: "-6.875576, 107.604352",
          status: "inactive",
          volume: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Tamansari",
          location: "-6.908792, 107.615854",
          status: "inactive",
          volume: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("TPStorages", null, {});
  },
};
