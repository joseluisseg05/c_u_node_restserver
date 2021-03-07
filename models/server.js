const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        //this.usuariosPath = '/api/usuarios';
        //this.authPath = '/api/auth';
        this.paths = {
            auth        : '/api/auth',
            categorias  : '/api/categorias',
            usuarios    : '/api/usuarios'
        }

        //conectar bd
        this.conectarDB();

        //Middlewares
        this.middlewares();

        //Rutas de aplicacion 
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){

        //cors
        this.app.use(cors());

        //lectura y parcio
        this.app.use( express.json());

        //directorio publico
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.categorias, require('../routes/categorias'));
        this.app.use(this.paths.usuarios, require('../routes/usuarios'))
    }

    listen(){
        this.app.listen(this.port, ()=> {
            console.log('Servidor corriendo en: ', this.port);
        });
    }
}

module.exports = Server;