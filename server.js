const logger        = require('morgan');
var passport   = require('passport')
var session    = require('express-session')
var bodyParser = require('body-parser')
const express = require("express");
const cors = require("cors"); 
var env = require('dotenv'); 


class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.app.use(logger('dev'));
        //For BodyParser 
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        
        

        this.usersPath = "/api/usuarios";
 
        this.db();
        this.middlewares();
        this.routes();
    }

    routes(){
        this.app.use(this.usersPath, require("./routes/usuario"));

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
    db(){
        //Models 
        var models = require("./models");
        //Sync Database 
        models.sequelize.sync().then(function() {
            console.log('Nice! Database looks fine')
        }).catch(function(err) {
            console.log(err, "Something went wrong with the Database Update!")
        });
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`Servidor escuchando en el puerto ${this.port}`);
        });
    }
}

module.exports = Server;