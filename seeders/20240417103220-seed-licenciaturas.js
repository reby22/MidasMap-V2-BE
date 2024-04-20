'use strict';
const faker = require('faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const licenciaturasData = [];

    for (let i = 0; i <10 ; i++) {
      licenciaturasData.push({
        id_licenciatura: i + 1,
        licenciatura: `Licenciatura en ${faker.random.words(2)}`,
      });
    }

    await queryInterface.bulkInsert('licenciaturas', licenciaturasData);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('licenciaturas', null, {});
  }
};
