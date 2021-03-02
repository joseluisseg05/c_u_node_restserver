const { Router } = require('express');
const { check } = require('express-validator');

const user = require('../controllers/usuarios');
const { validarCampos } = require('../middlewares/validar_campos');
const Role = require('../models/role');

const router = Router();

router.get('/', user.usuariosGet);

router.post('/', [ //almacena los errores 
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria y tener 6 caracteres').isLength({min:6}),
    check('correo', 'El correo no es valido').isEmail(),
    //check('rol', 'No es un Rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']), // validar contra una lista
    check('rol').custom( async (rol = '') =>{ //validar contra datos en base de datos
        const existeRol = await Role.findOne({rol});
        if (!existeRol)
            throw new Error(`El rol ${rol} no esta registrado`);
    }),
    validarCampos
],user.usuariosPost);

router.put('/:id', user.usuariosPut);

router.patch('/', user.usuariosPatch)

router.delete('/', user.usuariosDelete);

module.exports = router;
