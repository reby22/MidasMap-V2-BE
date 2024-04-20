'use strict';
//NOS FALTA QUE NOS BRINDE NUMERO DE RIESGOS 
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = [];
    const nombreRiesgos = ['Alto', 'Medio', 'Intermedio', 'Bajo', ' Minimo'];

    for (let i = 0; i < nombreRiesgos.length; i++) {
      data.push({
        id_riesgo: i + 1,
        riesgo: nombreRiesgos[i],
      });
    }

    await queryInterface.bulkInsert('riesgos', data);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('riesgos', null, {});
  }
};
