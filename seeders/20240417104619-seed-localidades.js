'use strict';
const faker = require('faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const localidadesData = [];

    for (let i = 0; i < 30; i++) {
      localidadesData.push({
        id_localidad: i + 1,
        id_estado: Math.floor(Math.random() * 10) + 1,
        localidad: faker.address.city(),
      });
    }

    await queryInterface.bulkInsert('localidades', localidadesData);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('localidades', null, {});
  }
};
