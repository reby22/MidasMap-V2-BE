'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = [];

    for (let i = 2; i <= 21; i++) {
      data.push({
        id_control_usuario: i-1,
        id_usuario: i,
        id_administrador: 1,
        id_rol_anterior: 2,
        createdAt: new Date(),
        updatedAt: new Date(),

      });
    }

    await queryInterface.bulkInsert('control_usuarios', data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('control_usuarios', null, {});
  }
};
