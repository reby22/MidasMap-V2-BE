'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = [];

    const array = ['Se desconoce', 'Predominantemente Femeninos','Predominantemente Mascuino', 'Ambos Sexos'];

    // Generar datos para cada grado
    for (let i = 0; i < array.length; i++) {
      data.push({
        id_distribucion: i + 1,
        distribucion: array[i],
      });
    }

    await queryInterface.bulkInsert('distribuciones_sexo', data);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('distribuciones_sexo', null, {});
  }
};
