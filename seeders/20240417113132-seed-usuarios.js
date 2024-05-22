'use strict';
const faker = require('faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = [];

    for (let i = 3; i <= 21; i++) {
      data.push({
        id_usuario: i,
        nombre: faker.name.firstName(),
        ap_paterno: faker.name.lastName(),
        ap_materno: faker.name.lastName(),
        telefono_fijo: faker.phone.phoneNumberFormat(),
        telefono_celular: faker.phone.phoneNumberFormat(),
        correo: faker.internet.email(),
        contraseña: faker.internet.password(),
        especialidad: faker.company.bsNoun(),
        sub_especialidad: faker.company.bsBuzz(),
        ultima_cedula_dgp:Math.floor(Math.random() * 9000000000) + 1000000000,
        id_titulo: Math.floor(Math.random() * 12) + 1,
        id_licenciatura: Math.floor(Math.random() * 10) + 1,
        id_entidad: Math.floor(Math.random() * 20) + 1,
        id_grado: Math.floor(Math.random() * 6) + 1,
        fecha_nacimiento: faker.date.past(30, new Date('2000-01-01')),
        fecha_registro: faker.date.past(30, new Date()),
        id_rol: 2
      });
    }

    for (let i = 22; i <= 31; i++) {
      data.push({
        id_usuario: i,
        nombre: faker.name.firstName(),
        ap_paterno: faker.name.lastName(),
        ap_materno: faker.name.lastName(),
        telefono_fijo: faker.phone.phoneNumberFormat(),
        telefono_celular: faker.phone.phoneNumberFormat(),
        correo: faker.internet.email(),
        contraseña: faker.internet.password(),
        especialidad: faker.company.bsNoun(),
        sub_especialidad: faker.company.bsBuzz(),
        ultima_cedula_dgp:Math.floor(Math.random() * 9000000000) + 1000000000,
        id_titulo: Math.floor(Math.random() * 12) + 1,
        id_licenciatura: Math.floor(Math.random() * 10) + 1,
        id_entidad: Math.floor(Math.random() * 20) + 1,
        id_grado: Math.floor(Math.random() * 6) + 1,
        fecha_nacimiento: faker.date.past(30, new Date('2000-01-01')),
        fecha_registro: faker.date.past(30, new Date()),
        id_rol: 3
      });
    }

    data.push({
      id_usuario: 2,
      nombre: 'Juan Antonio',
      ap_paterno: 'Alvarado',
      ap_materno: 'Sanchez',
      telefono_fijo: faker.phone.phoneNumberFormat(),
      telefono_celular: faker.phone.phoneNumberFormat(),
      correo: 'colaborador@colaborador.com',
      contraseña: 12345678,
      especialidad: 'Medicina Interna',
      sub_especialidad: 'Cardiología',
      ultima_cedula_dgp:Math.floor(Math.random() * 9000000000) + 1000000000,
      id_titulo: 1,
      id_licenciatura: Math.floor(Math.random() * 10) + 1,
      id_entidad: Math.floor(Math.random() * 20) + 1,
      id_grado: Math.floor(Math.random() * 6) + 1,
      fecha_nacimiento: faker.date.past(30, new Date('2002-01-01')),
      fecha_registro: faker.date.past(30, new Date()),
      id_rol: 2,
    });

    data.push({
      id_usuario: 1,
      nombre: 'Sandra E.',
      ap_paterno: 'Guerra',
      ap_materno: 'Palomares',
      telefono_fijo: faker.phone.phoneNumberFormat(),
      telefono_celular: faker.phone.phoneNumberFormat(),
      correo: 'admin@admin.com',
      contraseña: 12345678,
      especialidad: 'Biomedicina',
      sub_especialidad: 'Genómica Viral y Epidemiología Molecular',
      ultima_cedula_dgp:Math.floor(Math.random() * 9000000000) + 1000000000,
      id_titulo: 1,
      id_licenciatura: Math.floor(Math.random() * 10) + 1,
      id_entidad: Math.floor(Math.random() * 20) + 1,
      id_grado: 5,
      fecha_nacimiento: faker.date.past(30, new Date('1994-06-03')),
      fecha_registro: faker.date.past(30, new Date()),
      id_rol: 1,
    });

    await queryInterface.bulkInsert('usuarios', data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('usuarios', null, {});
  }
};
