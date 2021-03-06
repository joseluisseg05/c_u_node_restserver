const { Router } = require('express');
const { check } = require('express-validator');

const { login, googleSingIn } = require('../controllers/auth');
//const { emailNoExiste } = require('../helpers/db_varidators');
const { validarCampos } = require('../middlewares/validar_campos');


const router = Router();

router.post('/login', [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').notEmpty(),
    validarCampos
] , login);

router.post('/google', [
    check('id_token', 'El token es necesario').notEmpty(),
    validarCampos
] , googleSingIn);


module.exports = router;