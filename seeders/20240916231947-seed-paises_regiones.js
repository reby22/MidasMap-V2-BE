'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = [];

    const values = [[15,15],[1,23],[1,23],[15,15],[1,23]];
    let id=0;

    for (let i = 0; i < values.length; i++) {
      for(let j=values[i][0]; j<=values[i][1];  j++){
        id++;
        data.push({
          id_pais_region: id,
          id_region: i + 1,
          id_pais: j,
        });
      }
    }

    await queryInterface.bulkInsert('paises_region', data);
  
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('paises_region', null, {});
  }
};
