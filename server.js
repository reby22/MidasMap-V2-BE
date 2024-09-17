const logger        = require('morgan');
var passport   = require('passport')
var session    = require('express-session')
var bodyParser = require('body-parser')
const express = require("express");
const cors = require("cors"); 
var env = require('dotenv'); 
const {dbConnection} = require('./config/dbConnection');
const {Localidad, Estado, Pais, Titulo, Licenciatura, Grado, Rol, Usuario, Region} = require('./models/associations');


class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.app.use(logger('dev'));
        //For BodyParser 
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        
        

        this.usersPath = "/api/usuarios";
        this.estadosPath = "/api/estados";
        this.localidadesPath = "/api/localidades";
        this.paisesPath = "/api/paises";
        this.grupos_riesgoPath = "/api/gruposRiesgo";
        this.agentes_causalPath = "/api/agentes";
        this.reportesPath = "/api/reportes";
        this.tipos_notificacionPath = "/api/tiposNotificacion";
        this.riesgosPath = "/api/riesgos";
        this.notificacionesPath = "/api/notificaciones";
        this.rolesPath = "/api/roles";
        this.gradosPath = "/api/grados";
        this.licenciaturasPath = "/api/licenciaturas";
        this.titulosPath = "/api/titulos";
        this.transmisionesPath = "/api/transmisiones";
        this.patogenosPath = "/api/patogenos";
        this.medidasPath = "/api/medidasTiempo";
        this.regionesPath = "/api/regiones";




        dbConnection();
        this.middlewares();
        this.routes();
    }

    routes(){
        this.app.use(this.usersPath, require("./routes/usuario"));
        this.app.use(this.estadosPath, require("./routes/estado"));
        this.app.use(this.localidadesPath, require("./routes/localidad"));
        this.app.use(this.paisesPath, require("./routes/pais"));
        this.app.use(this.grupos_riesgoPath, require("./routes/grupo_riesgo"));
        this.app.use(this.agentes_causalPath, require("./routes/agente_causal"));
        this.app.use(this.reportesPath, require("./routes/reporte"));
        this.app.use(this.tipos_notificacionPath, require("./routes/tipo_notificacion"));
        this.app.use(this.riesgosPath, require("./routes/riesgo"));
        this.app.use(this.notificacionesPath, require("./routes/notificacion"));
        this.app.use(this.rolesPath, require("./routes/rol"));
        this.app.use(this.gradosPath, require("./routes/grado"));
        this.app.use(this.licenciaturasPath, require("./routes/licenciatura"));
        this.app.use(this.titulosPath, require("./routes/titulo"));
        this.app.use(this.transmisionesPath, require("./routes/ruta_transmision"));
        this.app.use(this.patogenosPath, require("./routes/tipo_patogeno"));
        this.app.use(this.medidasPath, require("./routes/medida_tiempo"));
        this.app.use(this.regionesPath, require("./routes/region"));

        this.app.get("*", (req, res) => {
            res.status(404).send("Error - ruta no encontrada");
        })
    }

    middlewares(){
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // session secret 
        this.app.use(passport.initialize());
        this.app.use(passport.session());
    }


    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`Servidor escuchando en el puerto ${this.port}`);
        });
    }
}

module.exports = Server;