const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT;
        this.usuarios = '/api/usuarios';
        this.auth = '/api/auth';

        // Conectar a la Base de Datos
        this.conectionDB();
        // Middlewares
        this.middleware();
        //Rutas de mi aplicación
        this.routes();
    }

    async conectionDB() {
        await dbConnection();
    }

    middleware() {

        //Cors limitar accesos al api
        this.app.use(cors());

        // Parseo y lectura del body
        this.app.use(express.json())
        // Directorio Público
        this.app.use(express.static('public'));
    }

    routes() {
        //  Aqui se configuran las rutas a acceder desde  mi controlador
        this.app.use(this.auth, require('../routes/auth'));
        this.app.use(this.usuarios, require('../routes/usuarios'));

    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server activo por el puerto ${this.port}`)

        });
    }
}

module.exports = Server