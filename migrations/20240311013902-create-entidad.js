'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('entidads', {
      id:{
        type: Sequelize.BIGINT
      },
      id_entidad: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      id_estado: {
        type: Sequelize.BIGINT,
        references: {
          model: 'estado_institucion',
          key: "id_estado"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      },
      id_tipo: {
        type: Sequelize.BIGINT,
        references: {
          model: 'tipo_entidad',
          key: "id_tipo"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      },
      nombre: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('entidads');
  }
};