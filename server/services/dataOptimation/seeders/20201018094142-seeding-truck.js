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
          cost: 10,
          capacity: 10,
          status: "available",
          location: "-6.891205299999999, 107.6266582",
          DriverId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          truck_code: "truck-2",
          cost: 40,
          capacity: 7,
          status: "available",
          location: "-6.891205299999999, 107.6266582",
          DriverId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          truck_code: "truck-3",
          cost: 20,
          capacity: 9,
          status: "available",
          location: "-6.891205299999999, 107.6266582",
          DriverId: 4,
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
