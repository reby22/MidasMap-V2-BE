const logger        = require('morgan');
var passport   = require('passport')
var session    = require('express-session')
var bodyParser = require('body-parser')
const express = require("express");
const cors = require("cors"); 
var env = require('dotenv'); 
const {dbConnection} = require('./config/dbConnection');
const {Estado_institucion, Tipo_entidad, Entidad, Titulo, Licenciatura, Grado, Rol, Usuario} = require('./models/associations');


class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.app.use(logger('dev'));
        //For BodyParser 
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        
        

        this.usersPath = "/api/usuarios";
        this.estadoPath = "/api/estados";
        this.localidadPath = "/api/localidades";
        this.entidadPath = "/api/entidades";
        this.bslPath = "/api/bsl";
        this.agente_causalPath = "/api/agentes";
        this.reportePath = "/api/reportes";
        this.tipo_alertaPath = "/api/tipoAlertas";
        this.riesgoPath = "/api/riesgos";
        this.alertaPath = "/api/alertas";
        this.rolPath = "/api/roles";
        this.gradoPath = "/api/grados";
        this.licenciaturaPath = "/api/licenciaturas";
        this.tituloPath = "/api/titulos";
        this.distribucionesPath = "/api/distribuciones";
        this.transmisionesPath = "/api/transmisiones";
        this.enfermedadesPath = "/api/enfermedades";




        dbConnection();
        this.middlewares();
        this.routes();
    }

    routes(){
        this.app.use(this.usersPath, require("./routes/usuario"));
        this.app.use(this.estadoPath, require("./routes/estado"));
        this.app.use(this.localidadPath, require("./routes/localidad"));
        this.app.use(this.entidadPath, require("./routes/entidad"));
        this.app.use(this.bslPath, require("./routes/bsl"));
        this.app.use(this.agente_causalPath, require("./routes/agente_causal"));
        this.app.use(this.reportePath, require("./routes/reporte"));
        this.app.use(this.tipo_alertaPath, require("./routes/tipo_alerta"));
        this.app.use(this.riesgoPath, require("./routes/riesgo"));
        this.app.use(this.alertaPath, require("./routes/alerta"));
        this.app.use(this.rolPath, require("./routes/rol"));
        this.app.use(this.gradoPath, require("./routes/grado"));
        this.app.use(this.licenciaturaPath, require("./routes/licenciatura"));
        this.app.use(this.tituloPath, require("./routes/titulo"));
        this.app.use(this.distribucionesPath, require("./routes/distribucion_sexo"));
        this.app.use(this.transmisionesPath, require("./routes/modo_transmision"));
        this.app.use(this.enfermedadesPath, require("./routes/tipo_enfermedad"));


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