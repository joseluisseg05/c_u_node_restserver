const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const { idCategoriaExiste } = require('../helpers/db_varidators');

const categoria = require('../controllers/categorias');


const router = Router();

//crear midder para id de cate: existeCategoria *listo

//Obterner todas las categorias - publico
router.get('/', categoria.obtenerCategorias);

//Obterner un categoria po id - publico
router.get('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(idCategoriaExiste),
    validarCampos,
], categoria.obtenerCategoria);

//Crear categoria - privado - cualquier persona con token valido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    validarCampos
], categoria.crearCategoria);

//Actualizar categoria - privado - cualquier persona con token valido
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(idCategoriaExiste),
    validarCampos,
], categoria.actualizarCategoria);

//Borrar categoria - solo Admin
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(idCategoriaExiste),
    validarCampos,
], categoria.borrarCategoria);


module.exports = router;