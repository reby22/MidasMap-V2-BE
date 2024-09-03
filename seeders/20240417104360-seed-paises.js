'use strict';
const faker = require('faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const data = [];
        const nombres = ['Argentina',' Bolivia',' Brasil ','Canadá',' Chile',' Colombia',' Costa Rica',' Cuba',' Ecuador',' El Salvador',' Estados Unidos',' Groenlandia',' Guatemala',' Guyana Honduras',' México',' Nicaragua',' Panamá',' Paraguay',' Perú',' República Dominicana',' Surinam ','Uruguay',' Venezuela'];

        for (let i = 0; i < nombres.length; i++) {
            data.push({
                id_pais: i+1,
                pais: nombres[i],
            });
        }

        await queryInterface.bulkInsert('paises', data);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('paises', null, {});
    }
};
