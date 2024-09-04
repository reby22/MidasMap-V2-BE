'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = [];
    const nombreGrupos = ['BSL2', 'BSL3', 'BSL4','ABSL1', 'ABSL2', 'ABSL3', 'ABSL4'];
    const nombreDescripciones=['Patógenos moderadamente peligrosos para humanos y que se transmiten principalmente por contacto directo, ingestión, o exposición a superficies contaminadas',
      'Patógenos que causan enfermedades graves o potencialmente letales en humanos, principalmente transmitidos por aerosoles',
      'atógenos de alto riesgo que causan enfermedades mortales en humanos, para las cuales no existen vacunas ni tratamientos disponibles y se transmiten por varias rutas, incluidos aerosoles, contacto directo y exposición a fluidos corporales infectados',
      null,
      'Patógenos moderadamente peligrosos, pueden causar enfermedades en animales, pero pocas probabilidades de propagarse al ser transmitidos por contacto directo, ingestión, exposición a superficies contaminadas',
      'Patógenos que causan enfermedades graves o potencialmente letales en animales, transmitidos por aerosoles. ',
      'Patógenos de alto riesgo por causar enfermedades mortales animales para los cuales no existen vacunas ni tratamientos disponibles y que se transmiten por varias rutas, incluidos aerosoles, contacto directo y exposición a fluidos corporales infectados.',
    ];

    for (let i = 0; i < nombreGrupos.length; i++) {
      data.push({
        id_grupo_riesgo: i + 1,
        grupo_riesgo: nombreGrupos[i],
        descripcion: nombreDescripciones[i],
      });
    }

    await queryInterface.bulkInsert('grupos_riesgo', data);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('grupos_riesgo', null, {});
  }
};
