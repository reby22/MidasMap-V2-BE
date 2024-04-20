'use strict';
const faker = require('faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = [];

    for (let i = 0; i < 10; i++) {
      data.push({
        id_estado: i + 1,
        estado: faker.address.state(),
      });
    }

    await queryInterface.bulkInsert('estados', data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('estados', null, {});
  }
};
