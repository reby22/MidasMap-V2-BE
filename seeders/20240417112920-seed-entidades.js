'use strict';
const faker = require('faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    const data = [];
    for (let i = 1; i <= 10; i++) {
      data.push({
        id_entidad: i,
        id_localidad: Math.floor(Math.random() * 30) + 1,
        id_tipo: 1,
        nombre: faker.company.companyName(),
      });
    }

    for (let i = 11; i <= 20; i++) {
      data.push({
        id_entidad: i,
        id_localidad: Math.floor(Math.random() * 30) + 1,
        id_tipo: 2,
        nombre: faker.company.companyName(),
      });
    }

    await queryInterface.bulkInsert('entidades', data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('entidades', null, {});
  }
};
