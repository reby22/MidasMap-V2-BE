'use strict';
const faker = require('faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = [];
    // Fecha actual
    const fechaActual = new Date();
    // Fecha 2 meses en el pasado
    const fechaPast2 = new Date(fechaActual.getFullYear(), fechaActual.getMonth() - 2, 1);
    // Fecha 4 meses en el pasado
    const fechaPast4 = new Date(fechaActual.getFullYear(), fechaActual.getMonth() - 4, 1);
    // Fecha 2 meses en el futuro
    const fechaFut2 = new Date(fechaActual.getFullYear(), fechaActual.getMonth() + 2, 0);
    // Fecha 4 meses en el futuro
    const fechaFut4 = new Date(fechaActual.getFullYear(), fechaActual.getMonth() + 4, 0);

    for (let i = 1; i <= 10; i++) {
      data.push({
        id_alerta: i,
        id_tipo:  Math.floor(Math.random() * 5) + 1,
        id_riesgo: Math.floor(Math.random() * 5) + 1,
        id_usuario: 1,
        fecha_inicio: faker.date.between(fechaPast4, fechaPast2),
        fecha_fin: faker.date.between(fechaPast2, fechaActual),
        ubicacion: faker.address.city(),
        descripcion: faker.lorem.sentence(),
      });
    }

    for (let i = 6; i <= 5; i++) {
      data.push({
        id_alerta: i,
        id_tipo: 1,
        id_riesgo: Math.floor(Math.random() * 5) + 1,
        id_usuario: 1,
        fecha_inicio: aker.date.between(fechaActual, fechaFut2),
        fecha_fin: aker.date.between(fechaFut2, fechaFut4),
        ubicacion: faker.address.city(),
        descripcion: faker.lorem.sentence(),
      });
    }

    await queryInterface.bulkInsert('alertas', data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('alertas', null, {});
  }
};
