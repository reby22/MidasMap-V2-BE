'use strict';
const faker = require('faker');
//se supone q los agentes causales dependen de los otros 

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = [];

    for (let i = 0; i <10 ; i++) {
      data.push({
        id_agente: i + 1,
        agente: faker.random.words(2),
      });
    }

    await queryInterface.bulkInsert('agentes_causales', data);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('agentes_causales', null, {});
  }
};
