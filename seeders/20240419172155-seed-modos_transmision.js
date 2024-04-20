'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = [];

    const array = ['Se desconoce','Alimenticia', 'Agua', 'Contacto animal','Persona a persona', 'Ambiental', 
    'Contacto directo', 'Contacto indirecto', 'Contacto Pflugge', 'Aerosoles respiratorios', 'Inoculación parental',
    'Ingestión', 'Sexual', 'Vehículo', 'Artrópodo', 'Otra'];
    // Generar datos para cada grado
    for (let i = 0; i < array.length; i++) {
      data.push({
        id_modo_transmision: i + 1,
        modo_transmision: array[i],
      });
    }

    await queryInterface.bulkInsert('modos_transmision', data);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('modos_transmision', null, {});
  }
};
