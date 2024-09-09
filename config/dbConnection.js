const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('midasmap', 'root',null,{
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
});
const dbConnection = async () => {
    
    try{
        await sequelize.authenticate();
        console.log('Db connection has been establiched successfully');
    }catch (error){
        console.error('Unable to connect to the database:', error);
    }
};

module.exports = {dbConnection, sequelize}