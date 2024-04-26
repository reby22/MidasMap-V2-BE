'use strict';
const faker = require('faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = [];
    const nombres=['Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche', 'Chiapas', 'Chihuahua', 'Ciudad de México', 'Coahuila', 'Colima', 'Durango', 'Estado de México', 'Guanajuato', 'Guerrero', 'Hidalgo', 'Jalisco', 'Michoacán', 'Morelos', 'Nayarit', 'Nuevo León', 'Oaxaca', 'Puebla', 'Querétaro', 'Quintana Roo', 'San Luis Potosí', 'Sinaloa', 'Sonora', 'Tabasco', 'Tamaulipas', 'Tlaxcala', 'Veracruz', 'Yucatán', 'Zacatecas'];

    for (let i = 0; i < nombres.length; i++) {
      data.push({
        id_estado: i + 1,
        estado: nombres[i],
      });
    }

    await queryInterface.bulkInsert('estados', data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('estados', null, {});
  }
};
