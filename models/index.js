// *************************************************************
// Centralización de modelos en un solo archivo
// *************************************************************
const Server = require('./server');
const Usuario = require('./usuario');
const Role = require('./role');
const Categoria = require('./categoria');

// *************************************************************
// Exportaciones
// *************************************************************
module.exports = {
    Server,
    Usuario,
    Role,
    Categoria,
}