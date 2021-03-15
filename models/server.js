const express = require('express');
const cors = require('cors')

class Server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT;
        this.usuarios = ('/api/usuarios');

        // Middlewares
        this.middleware();
        //Rutas de mi aplicación
        this.routes();
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
        this.app.use(this.usuarios, require('../routes/usuarios'));

    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server activo por el puerto ${this.port}`)

        });
    }
}

module.exports = Server