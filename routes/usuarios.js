const { Router } = require('express');
const { check } = require('express-validator');

const user = require('../controllers/usuarios');
const { esRolValido, emailExiste, idUsuarioExiste } = require('../helpers/db_varidators');

//const { validarCampos } = require('../middlewares/validar_campos');
//const { validarJWT } = require('../middlewares/validar_jwt');
//const { esAdminRole, tieneRole } = require('../middlewares/validar_roles');
const { 
    validarCampos, 
    validarJWT,
    esAdminRole,
    tieneRole
} = require('../middlewares');

const router = Router();

router.get('/', user.usuariosGet);

router.post('/', [ //almacena los errores 
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria y tener 6 caracteres').isLength({min:6}),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( emailExiste),
    //check('rol', 'No es un Rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']), // validar contra una lista
    // (rol) => esRolValido(rol) como es el primer parametro que se valida se elimina y solo se deja la referencia
    check('rol').custom( esRolValido ),//validar contra datos en base de datos
    validarCampos
],user.usuariosPost);

router.put('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( idUsuarioExiste ),
    check('rol').custom( esRolValido ),
    validarCampos
], user.usuariosPut);

router.patch('/', user.usuariosPatch)

router.delete('/:id', [
    validarJWT,
    //esAdminRole, forzar a que usuario es admin
    tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'),
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( idUsuarioExiste ),
    validarCampos
] , user.usuariosDelete);

module.exports = router;
