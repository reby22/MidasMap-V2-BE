'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = [];

    const nombresRegiones = ['Todo México', 'Todas las américas','Todo el mundo', 'Estados Mexicanos Especificos', 'Países Americanos Específicos'];
    
    for (let i = 0; i < nombresRegiones.length; i++) {
      data.push({
        id_region: i + 1,
        region: nombresRegiones[i],
      });
    }

    await queryInterface.bulkInsert('regiones', data);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('regiones', null, {});
  }
};
