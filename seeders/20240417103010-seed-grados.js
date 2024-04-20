'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const gradosData = [];

    // Agreagar Grados especificos
    const nombresGrados = ['Licenciatura', 'Especialidad', 'Subespecialidad', 'Maestria', 'Doctorado', 'Post Doctorado'];

    // Generar datos para cada grado
    for (let i = 0; i < nombresGrados.length; i++) {
      gradosData.push({
        id_grado: i + 1,
        grado: nombresGrados[i],
      });
    }

    await queryInterface.bulkInsert('grados', gradosData);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('grados', null, {});
  }
};
