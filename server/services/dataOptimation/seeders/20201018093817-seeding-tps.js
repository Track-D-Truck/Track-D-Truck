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
          address:
            "Jl. Dago Elos II No.115, Dago, Kecamatan Coblong, Kota Bandung, Jawa Barat 40135, Indonesia",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Cihampeulas",
          location: "-6.8881609, 107.6039859",
          status: "active",
          volume: 3,
          address:
            "Jl. Cihampelas No.250-264, Cipaganti, Kecamatan Coblong, Kota Bandung, Jawa Barat 40131, Indonesia",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "GOR Saparua",
          location: "-6.9088007, 107.6158271",
          status: "active",
          volume: 3,
          address:
            "Jl. Saparua, Citarum, Kec. Bandung Wetan, Kota Bandung, Jawa Barat 40115, Indonesia",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Dipatiukur",
          location: "-6.8927743, 107.6166699",
          status: "active",
          volume: 2,
          address:
            "Jl. Tengku Angkasa No.18, Lebakgede, Kecamatan Coblong, Kota Bandung, Jawa Barat 40132, Indonesia",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Komplek Arcamanik",
          location: "-6.9253771, 107.6747138",
          status: "active",
          volume: 2,
          address:
            "Jl. Terjun Tandom No.62, Cisaranten Endah, Kec. Arcamanik, Kota Bandung, Jawa Barat 40293, Indonesia",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Pasar Gede Bage",
          location: "-6.9365806, 107.6961952",
          status: "active",
          volume: 2,
          address:
            "Jl. Soekarno-Hatta No.823, Babakan Penghulu, Cinambo, Kota Bandung, Jawa Barat 40293, Indonesia",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Simpang Sari",
          location: "-6.9061884, 107.6685101",
          status: "active",
          volume: 2,
          address:
            "Jl. Simpangsari No.51, Sukamiskin, Kec. Arcamanik, Kota Bandung, Jawa Barat 40293, Indonesia",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Neglasari",
          location: "-6.916542499999999, 107.7065762",
          status: "active",
          volume: 2,
          address:
            "Jl. Negla Bakti No.3, Pasanggrahan, Kec. Ujung Berung, Kota Bandung, Jawa Barat 40617, Indonesia",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Tirtawening",
          location: "-6.9166927, 107.7117846",
          status: "inactive",
          volume: 2,
          address:
            "jl cilengkrang 1 perumahan, Jl. Tirtawening No.121, Cisurupan, Kec. Cibiru, Kota Bandung, Jawa Barat 40614, Indonesia",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Perhutani",
          location: "-6.9366075, 107.700182",
          status: "inactive",
          volume: 2,
          address:
            "Street Jl. Soekarno-Hatta No.740, Mekar Mulya, Kec. Gedebage, Kota Bandung, Jawa Barat 40292, Indonesia",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Ranca Meong",
          location: "-6.9391703, 107.6884252",
          status: "inactive",
          volume: 2,
          address:
            "Jl. Rancameong No.27-29, Babakan Penghulu, Cinambo, Kota Bandung, Jawa Barat 40295, Indonesia",
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
