const { Router } = require('express');
const { check } = require('express-validator');

const { Uploads } = require('../controllers');

const { validarCampos, validarArchivo } = require('../middlewares');

const { validarColecciones } = require('../helpers');

const router = Router();

router.post('/', validarArchivo ,Uploads.cargarArchivo);

router.put('/:coleccion/:id', [
    validarArchivo,
    check('id', 'El id no es valido').isMongoId(),
    check('coleccion').custom( c => validarColecciones( c, ['usuarios','productos'] ) ),
    validarCampos
], Uploads.actualizarImagenCloudinary);

router.get('/:coleccion/:id', [
    check('id', 'El id no es valido').isMongoId(),
    check('coleccion').custom( c => validarColecciones( c, ['usuarios','productos'] ) ),
    validarCampos
], Uploads.mostrarImg);

module.exports = router;

