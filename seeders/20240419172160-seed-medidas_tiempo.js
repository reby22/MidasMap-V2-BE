'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const data = [];

        const array = ['Se desconoce', 'Horas', ' Dias'];

        // Generar datos para cada grado
        for (let i = 0; i < array.length; i++) {
            data.push({
                id_medida: i + 1,
                medida: array[i],
            });
        }

        await queryInterface.bulkInsert('medidas_tiempo', data);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('medidas_tiempo', null, {});
    }
};
