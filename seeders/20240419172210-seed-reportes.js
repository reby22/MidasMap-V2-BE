'use strict';
const faker = require('faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = [];

    for (let i = 0; i < 60; i++) {
      const fechaPid = faker.date.past(1); // Fecha entre 1 día y 1 año atrás
      const fechaUpd = faker.date.between(fechaPid, new Date()); // Fecha entre fechaPid y hoy
      const random = Math.random();
      data.push({
        id_reporte: i + 1,
        titulo: `${faker.date.recent(30)}: Enfermedad ${faker.lorem.word()} (${faker.address.city()}, ${faker.address.county()}, ${faker.address.stateAbbr()})`,
        descripcion: faker.lorem.paragraph(),
        longitud: Math.floor(Math.random() * ((-99.0709) - (-103.3949) + 1)) + (-103.3949),
        latitud: Math.floor(Math.random() * (21.9737 -  18.3128 + 1)) +  18.3128,
        altitud: Math.floor(random * 5637), // Se agregó 1 al máximo para incluir 5636
        fecha_pid: fechaPid,
        fecha_upd: fechaUpd,
        id_distribucion_sexo: Math.floor(random * 4) + 1, // Se agregó 1 al máximo para incluir 4
        duracion_promedio_incubacion: Math.floor(random * 5),
        id_medida_dpi: Math.floor(random * 2) + 2, // Se agregó 2 al máximo para incluir 3
        duracion_promedio_enfermedad: Math.floor(random * 5),
        id_medida_dpe: Math.floor(random * 2) + 2, // Se agregó 2 al máximo para incluir 3
        signos_sintomas: faker.lorem.sentence(),
        id_modo_transmision: Math.floor(random * 16) + 1,
        numero_casos_sospechosos: Math.floor(random * 100),
        numero_casos_probables: Math.floor(random * 50),
        numero_casos_confirmados: Math.floor(random * 30),
        numero_casos_totales: Math.floor(random * 200),
        numero_casos_hospitalizados: Math.floor(random * 20),
        numero_muertos: Math.floor(random * 10),
        numero_casos_uci: Math.floor(random * 10),
        fecha_registro: fechaUpd,
        id_agente_causal: Math.floor(random * 210) + 1,
        id_usuario: Math.floor(random * 21) + 1,
        id_institucion_casos: Math.floor(Math.random() * 10) + 11,
        id_laboratorio: Math.floor(Math.random() * 10) + 1,
        aprobado: 1,
        estado_reporte: "Activo", 
      });
    }
    for (let i = 60; i < 70; i++) {
      const fechaPid = faker.date.past(1); // Fecha entre 1 día y 1 año atrás
      const fechaUpd = faker.date.between(fechaPid, new Date()); // Fecha entre fechaPid y hoy
      const random = Math.random();
      data.push({
        id_reporte: i + 1,
        titulo: `${faker.date.recent(30)}: Enfermedad ${faker.lorem.word()} (${faker.address.city()}, ${faker.address.county()}, ${faker.address.stateAbbr()})`,
        descripcion: faker.lorem.paragraph(),
        longitud: Math.floor(Math.random() * ((-99.0709) - (-103.3949) + 1)) + (-103.3949),
        latitud: Math.floor(Math.random() * (21.9737 -  18.3128 + 1)) +  18.3128,
        altitud: Math.floor(random * 5637), // Se agregó 1 al máximo para incluir 5636
        fecha_pid: fechaPid,
        fecha_upd: fechaUpd,
        id_distribucion_sexo: Math.floor(random * 4) + 1, // Se agregó 1 al máximo para incluir 4
        duracion_promedio_incubacion: Math.floor(random * 5),
        id_medida_dpi: Math.floor(random * 2) + 2, // Se agregó 2 al máximo para incluir 3
        duracion_promedio_enfermedad: Math.floor(random * 5),
        id_medida_dpe: Math.floor(random * 2) + 2, // Se agregó 2 al máximo para incluir 3
        signos_sintomas: faker.lorem.sentence(),
        id_modo_transmision: Math.floor(random * 16) + 1,
        numero_casos_sospechosos: Math.floor(random * 100),
        numero_casos_probables: Math.floor(random * 50),
        numero_casos_confirmados: Math.floor(random * 30),
        numero_casos_totales: Math.floor(random * 200),
        numero_casos_hospitalizados: Math.floor(random * 20),
        numero_muertos: Math.floor(random * 10),
        numero_casos_uci: Math.floor(random * 10),
        fecha_registro: fechaUpd,
        id_agente_causal: Math.floor(random * 210) + 1,
        // solo coolaboradores 
        id_usuario: Math.floor(Math.random() * (21 - 2 + 1)) + 2,
        id_institucion_casos: Math.floor(Math.random() * 10) + 11,
        id_laboratorio: Math.floor(Math.random() * 10) + 1,
        aprobado: 0,
        estado_reporte: "Inactivo",
      });
    }
    await queryInterface.bulkInsert('reportes', data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('reportes', null, {});
  }
};
