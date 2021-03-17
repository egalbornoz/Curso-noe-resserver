// Desestructurar expres y extraer el objeto Router
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos, validarJWT, esAdminRole, tieneRole } = require('../middlewares');
const { isRolValid, emailExiste, existeUsuarioPorId } = require('../helpers/db-valdators');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/usuarios');
const router = Router();


router.get('/', usuariosGet);


router.put('/:id', [
    //Middlewares
    check('id', 'No es un ID válido').isMongoId(),
    //Middlewares personalizados .custon
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(isRolValid),
    validarCampos,
], usuariosPut);



router.post('/', [
    //Middlewares
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('contraseña', 'La contraseña debe tener minimo 6 caracteres').isLength({ min: 6 }),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom(emailExiste),
    check('rol').custom(isRolValid),
    validarCampos
], usuariosPost);

router.delete('/:id', [
    validarJWT,
    // esAdminRole,
    tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),

    validarCampos
], usuariosDelete);

router.patch('/', usuariosPatch);

module.exports = router;