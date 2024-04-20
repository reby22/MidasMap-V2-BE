'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const rolesData = [];

    const nombresRoles = ['Administrador', 'Colaborador','Pendiente'];
    
    for (let i = 0; i < nombresRoles.length; i++) {
      rolesData.push({
        id_rol: i + 1,
        rol: nombresRoles[i],
      });
    }

    await queryInterface.bulkInsert('roles', rolesData);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('roles', null, {});
  }
};
