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
      "Trucks",
      [
        {
          truck_code: "truck-1",
          cost: 1000,
          capacity: 10,
          status: "available",
          location: "-6.86666, 107.60000",
          DriverId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          truck_code: "truck-2",
          cost: 1000,
          capacity: 7,
          status: "unavailable",
          location: "-6.86666, 107.60000",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          truck_code: "truck-3",
          cost: 1000,
          capacity: 7,
          status: "available",
          DriverId: 3,
          location: "-6.86666, 107.60000",
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
    await queryInterface.bulkDelete("Trucks", null, {});
  },
};
