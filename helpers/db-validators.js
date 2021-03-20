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
}
/********************************************************************************
 *Validador personalizado para verificar si existe email en la colección usuario
 ********************************************************************************/
const emailExiste = async (correo = '') => {
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error(`El correo:  ${correo} y existe`);
    }
}
/********************************************************************************
 *Validador personalizado para verificar si existe usuario en la colección usuario
 ********************************************************************************/
const existeUsuarioPorId = async (id) => {
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`El Id no existe ${id}`);
    }
}
/********************************************************************************
 *Validador personalizado para verificar existe categoria en la colección Categoria
 ********************************************************************************/
const existeCategoriaPorId = async (id) => {
    const existeCat = await Categoria.findById(id);
    if (!existeCat) {
        throw new Error(`La categoría no existe `);
    }
}
/********************************************************************************
 *Validador personalizado para verificar existe producto en la colección Producto
 ********************************************************************************/
const existeProductoPorId = async (id) => {
    const existePro = await Producto.findById(id);
    if (!existePro) {
        throw new Error(`El producto no existe `);
    }
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
}