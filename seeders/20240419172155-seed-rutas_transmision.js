'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = [];

    const array = ['Se desconoce','Contacto directo', 'Contacto indirecto (fómites)', 'Transmisión aérea','Transmisión por ingestión', 'Transmisión sanguínea', 
    'Transmisión vertical', 'Transmisión sexual', 'Inoculación por artrópodos'];
    // Generar datos para cada grado
    for (let i = 0; i < array.length; i++) {
      data.push({
        id_ruta_transmision: i + 1,
        ruta_transmision: array[i],
      });
    }

    await queryInterface.bulkInsert('rutas_transmision', data);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('rutas_transmision', null, {});
  }
};
