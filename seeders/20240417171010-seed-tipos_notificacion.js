'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = [];
    const nombresTipos = ['Alerta','Advertencia', 'Emergencia', 'Epidemia', 'Pandemia'];

    for (let i = 0; i < nombresTipos.length; i++) {
      data.push({
        id_tipo: i + 1,
        tipo: nombresTipos[i],
      });
    }

    await queryInterface.bulkInsert('tipos_notificacion', data);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tipos_notificacion', null, {});
  }
};
