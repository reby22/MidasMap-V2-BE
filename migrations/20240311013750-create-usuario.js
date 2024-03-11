'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('usuarios', {
      id:{
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      id_usuario: {
        allowNull: false,
        type: Sequelize.BIGINT
      },
      nombre: {
        type: Sequelize.STRING
      },
      ap_paterno: {
        type: Sequelize.STRING
      },
      ap_materno: {
        type: Sequelize.STRING
      },
      telefono_fijo: {
        type: Sequelize.STRING
      },
      telefono_celular: {
        type: Sequelize.STRING
      },
      correo: {
        type: Sequelize.STRING
      },
      contraseña: {
        type: Sequelize.STRING
      },
      id_titulo: {
        type: Sequelize.BIGINT,
        //references: {
        //  model: 'titulo',
        //  key: "id_titulo"
        //},
        //onDelete: "CASCADE",
        //onUpdate: "CASCADE"
      },
      id_licenciatura: {
        type: Sequelize.BIGINT,
        //references: {
        //  model: 'licenciatura',
        //  key: "id_licenciatura"
        //},
        //onDelete: "CASCADE",
        //onUpdate: "CASCADE"
      },
      especialidad: {
        type: Sequelize.STRING
      },
      sub_especializacion: {
        type: Sequelize.STRING
      },
      ultima_cedula_dgp: {
        type: Sequelize.STRING
      },
      id_entidad: {
        type: Sequelize.BIGINT,
        //references: {
        //  model: 'entidad',
        //  key: "id_entidad"
        //},
        //onDelete: "CASCADE",
        //onUpdate: "CASCADE"
      },
      id_grado: {
        type: Sequelize.BIGINT,
        //references: {
        //  model: 'grado',
        //  key: "id_grado"
        //},
        //onDelete: "CASCADE",
        //onUpdate: "CASCADE"
      },
      fecha_nacimiento: {
        type: Sequelize.DATEONLY
      },
      fecha_registro: {
        type: Sequelize.DATEONLY
      },
      id_rol: {
        type: Sequelize.BIGINT,
        //references: {
        //  model: 'rol',
        //  key: "id_rol"
        //},
        //onDelete: "CASCADE",
        //onUpdate: "CASCADE"
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
    await queryInterface.dropTable('usuarios');
  }
};