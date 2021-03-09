const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');


const producto = require('../controllers/productos');
const { idProductoExiste, idCategoriaExiste } = require('../helpers/db_varidators');

const router = Router();

router.get('/', producto.obtenerAll);

router.get('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(idProductoExiste),
    validarCampos
], producto.obtenerById);

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es un campo valido').notEmpty(),
    check('categoria', 'El id no corresponse a un categoria').isMongoId(),
    check('categoria').custom(idCategoriaExiste),
    //check('descripcion', 'El producto necesita una descripcion').notEmpty(),
    validarCampos,
], producto.crear);

router.put('/:id', [
    validarJWT,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(idProductoExiste),
    validarCampos
], producto.actualizar);

router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(idProductoExiste),
    validarCampos
], producto.eliminar);

module.exports = router;