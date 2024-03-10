
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('usuarios', {
      id_usuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    ap_paterno: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    ap_materno: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    telefono_fijo: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    telefono_celular: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    correo: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    contraseña: {
      type: Sequelize.STRING,
      allowNull: false,
    },
      id_titulo: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'titulos',
          key: "id_titulo"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      },
      id_licenciatura: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'licenciaturas',
          key: "id_licenciaturas"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      },
      especialidad: {
        allowNull: false,
        type: Sequelize.STRING
      },
      sub_especializacion: {
        allowNull: false,
        type: Sequelize.STRING
      },
      ultima_cedula_dgp: {
        allowNull: false,
        type: Sequelize.STRING
      },
      id_entidad: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'entidades',
          key: "id_entidad"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      },
      id_grado: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'grados',
          key: "id_grado"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      },
      fecha_nacimiento: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      fecha_registro: {
        allowNull: false,
        type: Sequelize.DATE
      },
      id_rol: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'roles',
          key: "id_rol"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      }
    });
    
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('usuarios');
  }
  
};