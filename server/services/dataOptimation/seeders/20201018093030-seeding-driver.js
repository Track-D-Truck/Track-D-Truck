"use strict";
const {hashPass} = require(`../helpers/bcrypt`)
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
      "Drivers",
      [
        {
          name: "Ari",
          email: "ari@mail.com",
          password: hashPass("123456"),
          phone: 6281234567890,
          role: "admin",
          status: "unavailable",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Rijal",
          email: "rijal@mail.com",
          password: hashPass("123456"),
          phone: 6281234567891,
          role: "driver",
          status: "available",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Ginanjar",
          email: "ginanjar@mail.com",
          password: hashPass("123456"),
          phone: 6281234567892,
          role: "driver",
          status: "available",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Alek",
          email: "alek@mail.com",
          password: hashPass("123456"),
          phone: 6281234567893,
          role: "driver",
          status: "available",
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
    await queryInterface.bulkDelete("Drivers", null, {});
  },
};
