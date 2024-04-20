'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = [];
    const nombreBsls = ['RG2', 'RG23', 'RG4'];

    for (let i = 0; i < nombreBsls.length; i++) {
      data.push({
        id_bsl: i + 1,
        grupo: nombreBsls[i],
      });
    }

    await queryInterface.bulkInsert('bsls', data);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('bsls', null, {});
  }
};
