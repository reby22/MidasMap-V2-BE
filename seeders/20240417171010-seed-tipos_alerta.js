'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = [];
    const nombresTipos = ['Aviso', 'Alerta', 'Brote', 'Epidemia', 'Pandemia'];

    for (let i = 0; i < nombresTipos.length; i++) {
      data.push({
        id_tipo: i + 1,
        tipo: nombresTipos[i],
      });
    }

    await queryInterface.bulkInsert('tipos_alerta', data);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tipos_alerta', null, {});
  }
};
