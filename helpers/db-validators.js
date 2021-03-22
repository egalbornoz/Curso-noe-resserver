/********************************************************************************
 * Importaciones necesarias
 ********************************************************************************/
const { Role } = require('../models/role');
const { Usuario, Categoria, Producto } = require('../models');
/********************************************************************************
 *Validador personalizado para verificar si existe un rol en la colección Usuario
 ********************************************************************************/
const isRolValid = async (rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no esta registrado en la DB`);
    }
    return true;
}
/********************************************************************************
 *Validador personalizado para verificar si existe email en la colección usuario
 ********************************************************************************/
const emailExiste = async (correo = '') => {
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error(`El correo:  ${correo} y existe`);
    }
    return true;
}
/********************************************************************************
 *Validador personalizado para verificar si existe usuario en la colección usuario
 ********************************************************************************/
const existeUsuarioPorId = async (id) => {
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`El Id no existe ${id}`);
    }
    return true;
}
/********************************************************************************
 *Validador personalizado para verificar existe categoria en la colección Categoria
 ********************************************************************************/
const existeCategoriaPorId = async (id) => {
    const existeCat = await Categoria.findById(id);
    if (!existeCat) {
        throw new Error(`La categoría no existe `);
    }
    return true;
}
/********************************************************************************
 *Validador personalizado para verificar existe producto en la colección Producto
 ********************************************************************************/
const existeProductoPorId = async (id) => {
    const existePro = await Producto.findById(id);
    if (!existePro) {
        throw new Error(`El producto no existe `);
    }
    return true;
}
/********************************************************************************
 *Validador personalizado para verificar colecciones permitidas
 ********************************************************************************/
const coleccionesPermitidas = (coleccion = '', colecciones = []) => {
    const incluida = colecciones.includes(coleccion);
    if (!incluida) {
        throw new Error(`La coleccion ${coleccion} no es permitida ${colecciones}`);
    }
    return true;
}
/********************************************************************************
 *  Exportaciones del archivo
 ********************************************************************************/
module.exports = {
    existeCategoriaPorId,
    existeProductoPorId,
    emailExiste,
    existeUsuarioPorId,
    isRolValid,
    coleccionesPermitidas,
}