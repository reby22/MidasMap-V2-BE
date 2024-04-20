'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = [];
    const nombreEnfermedades = ['Bacterias', 'Homgos','Parásitos', 'Sindrome', 'Virus'];

    for (let i = 0; i < nombreEnfermedades.length; i++) {
      data.push({
        id_tipo: i + 1,
        tipo: nombreEnfermedades[i],
      });
    }

    await queryInterface.bulkInsert('tipos_enfermedad', data);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tipos_enfermedad', null, {});
  }
};