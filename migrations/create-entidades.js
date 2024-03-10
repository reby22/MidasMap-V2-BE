'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('entidades', {

      id_entidad: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_estado: {
        type: Sequelize.INTEGER,
        references: {
          model: 'estado_instituciones',
          key: "id_estado"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
        
      },
      id_tipo: {
        type: Sequelize.INTEGER,
        references: {
          model: 'tipos_entidad',
          key: "id_tipo"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      
      },
      nombre: {
        type: Sequelize.STRING
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('entidades');
  }
};