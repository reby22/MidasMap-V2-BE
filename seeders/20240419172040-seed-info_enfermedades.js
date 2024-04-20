'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = [];

    for (let i = 0; i <10 ; i++) {
      data.push({
        id_info_enfermedad: i + 1,
        id_bsl:Math.floor(Math.random() * 3) + 1,
        id_tipo_enfermedad: Math.floor(Math.random() * 5) + 1,
        id_agente: Math.floor(Math.random() * 10) + 1, 
      });
    }
    await queryInterface.bulkInsert('info_enfermedades', data);
  },

 
  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('info_enfermedades', null, {});
  }
};
