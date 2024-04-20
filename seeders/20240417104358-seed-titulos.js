'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = [];

    const nombresTitulos = ['Dr.', 'Dra.','QFB', 'Biol.','MVZ','Enfermero', 'Enfermera','MPSS', 'MP', 'MIP', 'MD', 'LCAS'];

    for (let i = 0; i < nombresTitulos.length; i++) {
      data.push({
        id_titulo: i + 1,
        titulo: nombresTitulos[i],
      });
    }

    await queryInterface.bulkInsert('titulos', data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('titulos', null, {});
  }
};
