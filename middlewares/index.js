//*******************************************************************************
// *  Importaciones  - Index para estructurar middlewares personalizados
//********************************************************************************/
const validaCampos = require('../middlewares/validar-campos');
const validaJWT = require('../middlewares/validar-jwt');
const validaRoles = require('../middlewares/validar-roles.js');

// ***********************************************************************************
// Exportaciones
// ***********************************************************************************
module.exports = {
    ...validaCampos,
    ...validaJWT,
    ...validaRoles
}