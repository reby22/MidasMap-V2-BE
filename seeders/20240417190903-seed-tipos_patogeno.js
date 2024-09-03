'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = [];
    const nombre= ['Bacterias','Virus','Hongos','Protozoos','Helmintos','Priones'];

    for (let i = 0; i < nombre.length; i++) {
      data.push({
        id_tipo: i + 1,
        tipo: nombre[i],
      });
    }

    await queryInterface.bulkInsert('tipos_patogeno', data);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tipos_patogeno', null, {});
  }
};